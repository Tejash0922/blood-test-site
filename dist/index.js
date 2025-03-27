// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  bookings;
  userCurrentId;
  bookingCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.bookingCurrentId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createBooking(insertBooking) {
    const id = this.bookingCurrentId++;
    const booking = {
      ...insertBooking,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async getBookings() {
    return Array.from(this.bookings.values());
  }
  async getBookingById(id) {
    return this.bookings.get(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  packageType: text("package_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertBookingSchema = createInsertSchema(bookings).pick({
  fullName: true,
  phoneNumber: true,
  packageType: true,
  preferredDate: true,
  address: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedBooking = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedBooking);
      res.status(201).json({ success: true, booking });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        res.status(500).json({ success: false, error: "An error occurred while creating the booking" });
      }
    }
  });
  app2.get("/api/bookings", async (_req, res) => {
    try {
      const bookings2 = await storage.getBookings();
      res.status(200).json({ bookings: bookings2 });
    } catch (error) {
      res.status(500).json({ success: false, error: "An error occurred while fetching bookings" });
    }
  });
  app2.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid booking ID" });
      }
      const booking = await storage.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ success: false, error: "Booking not found" });
      }
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ success: false, error: "An error occurred while fetching the booking" });
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const validatedUser = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedUser.username);
      if (existingUser) {
        return res.status(400).json({ success: false, error: "Username already exists" });
      }
      const user = await storage.createUser(validatedUser);
      res.status(201).json({ success: true, user });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        res.status(500).json({ success: false, error: "An error occurred while creating the user" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = path.dirname(__filename);
function log(message, source = "express") {
  const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  console.log(`[${time}] [${source}] ${message}`);
}
function serveStatic() {
  const possiblePaths = [
    path.join(process.cwd(), "dist/public"),
    path.join(process.cwd(), "public"),
    path.join(__dirname2, "../public"),
    path.join(__dirname2, "../dist/public")
  ];
  const distPath = possiblePaths.find((p) => fs.existsSync(p));
  if (!distPath) {
    log(`Static files not found in any of the possible locations`, "static");
    throw new Error("Static files not found - run build first");
  }
  log(`Serving static files from: ${distPath}`, "static");
  return express.static(distPath);
}
async function setupVite(app2, server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa"
    // Changed from "custom" to "spa"
  });
  app2.use(vite.middlewares);
  log("Vite development server configured", "vite");
}

// server/index.ts
import path2 from "path";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });
  if (process.env.NODE_ENV !== "production") {
    await setupVite(app, server);
  } else {
    app.use(serveStatic());
    app.get("*", (_req, res) => {
      const distPath = path2.join(__dirname, "../public");
      res.sendFile(path2.join(distPath, "index.html"));
    });
  }
  const port = process.env.PORT || 3e3;
  server.listen(port, "0.0.0.0", () => {
    log(`Server running at http://0.0.0.0:${port}`);
    log(`Mode: ${process.env.NODE_ENV || "development"}`);
  });
})();
