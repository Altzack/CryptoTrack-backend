const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const NEWS_KEY = process.env.NEWS_KEY;

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

app.get("/api/news", async (req, res) => {
  const { symbol } = req.query; // Accept symbols as a query parameter
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${NEWS_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend service running at http://localhost:${PORT}`);
});
