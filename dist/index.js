import express from 'express';
import { createServer } from 'http';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer, createLogger } from 'vite';
import { nanoid } from 'nanoid';
import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import themePlugin from '@replit/vite-plugin-shadcn-theme-json';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

// Storage implementation
class MemStorage {
  users = new Map();
  bookings = new Map();
  userCurrentId = 1;
  bookingCurrentId = 1;

  async getUser(id: number) {
    return this.users.get(id);
  }

  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: any) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: any) {
    const id = this.bookingCurrentId++;
    const booking = {
      ...insertBooking,
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings() {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number) {
    return this.bookings.get(id);
  }
}

const storage = new MemStorage();

// Schemas
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull()
});

const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  packageType: text('package_type').notNull(),
  preferredDate: text('preferred_date').notNull(),
  address: text('address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

const insertBookingSchema = createInsertSchema(bookings).pick({
  fullName: true,
  phoneNumber: true,
  packageType: true,
  preferredDate: true,
  address: true
});

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Vite config
const viteConfig = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== 'production' && process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then(
            (m) => m.cartographer()
          )
        ]
      : [])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  },
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true
  }
});

// Logger
const viteLogger = createLogger();

function log(message: string, source = 'express') {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Vite setup for development
async function setupVite(app: express.Application, server: any) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg: string, options?: any) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: 'custom'
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        __dirname,
        '..',
        'client',
        'index.html'
      );
      let template = await fs.promises.readFile(clientTemplate, 'utf-8');
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(page);
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });
}

// Static file serving for production
function serveStatic(app: express.Application) {
  const distPath = path.resolve(__dirname, 'dist/public');
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// API Routes
async function registerRoutes(app: express.Application) {
  app.post('/api/bookings', async (req, res) => {
    try {
      const validatedBooking = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedBooking);
      res.status(201).json({ success: true, booking });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'An error occurred while creating the booking' 
        });
      }
    }
  });

  app.get('/api/bookings', async (_req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'An error occurred while fetching bookings' 
      });
    }
  });

  app.get('/api/bookings/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid booking ID' 
        });
      }
      const booking = await storage.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ 
          success: false, 
          error: 'Booking not found' 
        });
      }
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'An error occurred while fetching the booking' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Main Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: any;
  const originalResJson = res.json;
  
  res.json = function(bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith('/api')) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + '…';
      }
      log(logLine);
    }
  });
  next();
});

// Server startup
(async () => {
  try {
    const server = await registerRoutes(app);
    
    // Error handling middleware
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || 'Internal Server Error';
      res.status(status).json({ message });
      console.error(err);
    });

    // Configure for development or production
    if (process.env.NODE_ENV !== 'production') {
      await setupVite(app, server);
      log('Running in development mode with Vite');
    } else {
      serveStatic(app);
      log('Running in production mode with static files');
    }

    const port = process.env.PORT || 3000;
    server.listen(port, '0.0.0.0', () => {
      log(`Server running at http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
