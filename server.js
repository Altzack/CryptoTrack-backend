const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = "789af179-6a9f-48db-85e5-c243353fa492";

// Route to get crypto data
app.get("/api/crypto-data", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
});

// Route to get global metrics
app.get("/api/global-metrics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch global metrics" });
  }
});

app.get("/api/meta-data", async (req, res) => {
  const { symbols } = req.query; // Accept symbols as a query parameter
  const API_KEY = "789af179-6a9f-48db-85e5-c243353fa492";

  if (!symbols) {
    return res.status(400).json({ error: "Symbols parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${symbols}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

app.get("/api/coin-meta", async (req, res) => {
  const { symbol } = req.query; // Accept symbol as a query parameter
  const API_KEY = "789af179-6a9f-48db-85e5-c243353fa492";

  if (!symbol) {
    return res.status(400).json({ error: "Symbol parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${symbol}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coin metadata" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend service running at http://localhost:${PORT}`);
});
