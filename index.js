const express = require("express");
const userRoute = require("./routes/userRoute"); // Adjust the path as necessary
const rateRoute = require("./routes/rateRoute");
const { initDb } = require("./postgres/postgres"); // Import the initDb function
const http = require("http");
const { generateRates, cleanupOldRates } = require("./services/rateService");
// const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// Routes
app.use("/user", userRoute);
app.use("/rate", rateRoute);

setInterval(async () => {
  //implement socket io here
  await generateRates();
}, 10000);

setInterval(async () => {
  //if delete then implement here
  await cleanupOldRates();
}, 30000);

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running and database is connected!");
});

// io.on("connection", (socket) => {
//   console.log("New client connected: ", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected", socket.id);
//   });
// });

// io.emit('rateUpdate', { newBuyRate, newSellRate }); // Broadcast rates to all clients

// Start the Express server
const startServer = async () => {
  await initDb(); // This will authenticate the connection and sync models
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer(); // Call the function to start the server
