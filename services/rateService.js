const { getCalculatedBuySellRate } = require("../controllers/rateController");
const { RateModel } = require("../postgres/postgres");

// Function to generate rates
const generateRates = async () => {
  try {
    // Fetch the latest rate based on createdAt field
    const getLatestRate = await RateModel.findOne({
      order: [["createdAt", "DESC"]], // Ordering in descending order to get the latest entry
    });

    // Check if a rate is found and do further processing
    if (!getLatestRate) {
      console.log("No rates found");
      return;
    }

    const { newBuyRate, newSellRate } = getCalculatedBuySellRate(
      getLatestRate.buy_rate,
      getLatestRate.sell_rate
    );

    // return { newBuyRate, newSellRate }
    console.log("🚀 ~ generateRates ~ newSellRate:", newSellRate);
    console.log("🚀 ~ generateRates ~ newBuyRate:", newBuyRate);
  } catch (error) {
    console.log("Error fetching rates:", error);
  }
};


const cleanupOldRates = async () => {
  try {
    // Get the latest 10 records from the database
    const latest10Rates = await RateModel.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      limit: 10, // Fetch only the latest 10 records
    });

    // Get the oldest record from the 10 records (to use as a cutoff for deletion)
    const oldestRate = latest10Rates[9]; // The 10th (oldest of the latest 10) record

    if (oldestRate) {
      // Delete records older than the 10th latest record
      await RateModel.destroy({
        where: {
          createdAt: {
            [Op.lt]: oldestRate.createdAt, // Delete records older than this timestamp
          },
        },
      });

      console.log("Old records deleted, keeping only the latest 10.");
    }
  } catch (error) {
    console.error("Error cleaning up old rates:", error);
  }
};


module.exports = {generateRates,cleanupOldRates};
