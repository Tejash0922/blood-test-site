import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/bookings", async (req: Request, res: Response) => {
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

  app.get("/api/bookings", async (_req: Request, res: Response) => {
    try {
      const bookings = await storage.getBookings();
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ success: false, error: "An error occurred while fetching bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req: Request, res: Response) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
