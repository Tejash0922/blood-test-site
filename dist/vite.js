// server/vite.ts
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function log(message, source = "express") {
  const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  console.log(`[${time}] [${source}] ${message}`);
}
function serveStatic() {
  const possiblePaths = [
    path.join(process.cwd(), "dist/public"),
    path.join(process.cwd(), "public"),
    path.join(__dirname, "../public"),
    path.join(__dirname, "../dist/public")
  ];
  const distPath = possiblePaths.find((p) => fs.existsSync(p));
  if (!distPath) {
    log(`Static files not found in any of the possible locations`, "static");
    throw new Error("Static files not found - run build first");
  }
  log(`Serving static files from: ${distPath}`, "static");
  return express.static(distPath);
}
async function setupVite(app, server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa"
    // Changed from "custom" to "spa"
  });
  app.use(vite.middlewares);
  log("Vite development server configured", "vite");
}
export {
  log,
  serveStatic,
  setupVite
};
