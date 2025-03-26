import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] [${source}] ${message}`);
}

export function serveStatic() {
  const distPath = path.join(__dirname, "../../dist/public");
  
  if (!fs.existsSync(distPath)) {
    log(`Static files not found at: ${distPath}`, "static");
    throw new Error("Static files not found - run build first");
  }

  log(`Serving static files from: ${distPath}`, "static");
  return express.static(distPath);
}

export async function setupVite(app: express.Express, server: any) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa" // Changed from "custom" to "spa"
  });

  app.use(vite.middlewares);
  log("Vite development server configured", "vite");
}
