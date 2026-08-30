const express = require("express");
const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.disable("x-powered-by");
app.use(express.json());
// Main route
app.get("/", (req, res) => {
  res.json({
    name: "RecRot",
    status: "online",
    message: "RecRot server is running"
  });
});
// Render health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});
// Example API route
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from RecRot"
  });
});
// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});
// Handle server errors
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: "Internal server error"
  });
});
// Render requires listening on its assigned port and external host
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`RecRot server running on port ${PORT}`);
});
// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server stopped");
    process.exit(0);
  });
});
