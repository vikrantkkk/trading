// controllers/RateController.js
const { Op } = require("sequelize");
const { RateModel } = require("../postgres/postgres");
// const Redis = require('ioredis');
// const WebSocket = require('ws');

// const redisClient = new Redis();
// const wss = new WebSocket.Server({ port: 8080 }); // Change port as needed

function getRandomSlip(min, max) {
  return Math.random() * (max - min) + min;
}

function getCalculatedBuySellRate(currentBuyRate, currentSellRate) {
  // Slip min and max range
  const slipMin = 0;
  const slipMax = 2;

  // Generate random slip value
  const randomSlip = getRandomSlip(slipMin, slipMax);

  // Calculate new buy rate and sell rate

  const newBuyRate = currentBuyRate - (currentBuyRate / 100 - randomSlip);
  const newSellRate = currentSellRate - (currentSellRate / 100 + randomSlip);
  // if they will tell me to insert new datain db then write logic here
  //it they iwll tell then implement cron here for delete  old record or delete via setInterval
  return { newBuyRate, newSellRate };

}


const createRate = async (req, res) => {
  try {
    const { currentBuyRate, currentSellRate } = req.body;

    // Validate input data
    if (currentBuyRate == null || currentSellRate == null) {
      return res
        .status(400)
        .json({ message: "Current buy rate and sell rate are required." });
    }

    // Create the new rate record
    const newRate = await RateModel.create({
      buy_rate: currentBuyRate,
      sell_rate: currentSellRate,
    });

    // Store in Redis
    // await redisClient.lpush('latestRates', JSON.stringify(newRate));
    // await redisClient.ltrim('latestRates', 0, 9); // Keep only the latest 10 records

    // Broadcast to WebSocket clients
    // wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(newRate));
    //   }
    // });

    res
      .status(201)
      .json({ message: "Rate created successfully", rate: newRate });
  } catch (error) {
    console.error("Error creating rate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.getAllRates = async (req, res) => {
//   try {
//     const rates = await RateModel.findAll({
//       order: [["createdAt", "DESC"]], // Get latest rates first
//     });
//     res.status(200).json(rates);
//   } catch (error) {
//     console.error("Error fetching rates:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// WebSocket connection handling
// wss.on('connection', (ws) => {
//   console.log('New client connected');

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// exports.getCurrentRates = async (req,res) => {
//   try {
//     const rates = await RateModel.findAll({
//       order: [["createdAt", "DESC"]],
//       limit: 10, // Get latest 10 records
//     });
//     return rates;
//   } catch (error) {
//     console.error("Error fetching current rates:", error);
//     throw error; // Rethrow to handle it in the calling function
//   }
// };

module.exports = {getCalculatedBuySellRate,createRate}