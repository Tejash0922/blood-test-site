import express from 'express';
import { createServer } from 'http';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Storage implementation
class MemStorage {
  users = new Map();
  bookings = new Map();
  userCurrentId = 1;
  bookingCurrentId = 1;

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

// Express app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static file serving for production
function serveStatic(app: express.Application) {
  const distPath = path.resolve(__dirname, '../dist/public');
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
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await storage.createBooking(req.body);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred while creating the booking' 
    });
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

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Start server
const server = createServer(app);
const port = process.env.PORT || 3000;

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  serveStatic(app);
}

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
