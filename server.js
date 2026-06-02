/* ════════════════════════════════════════════════════════
   EXPRESS SERVER — GOLD PRICE SCRAPER API
   تشغيل محلي: node server.js
   ثم الوصول عبر: http://localhost:3000/api/prices
   ════════════════════════════════════════════════════════ */

const express = require('express');
const cors = require('cors');
const { getGoldPrices } = require('./api/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS مفعل لـ Frontend
app.use(cors({
  origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:5500', '*'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

/**
 * GET /api/prices
 * Returns: { xauUsd, xauEgp, source, timestamp, success }
 */
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await getGoldPrices();
    
    if (prices.success) {
      res.json({
        success: true,
        data: prices
      });
    } else {
      res.status(500).json({
        success: false,
        error: prices.error || 'Failed to fetch prices'
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/prices/detailed
 * Returns: { xauUsd, xauEgp, usdEgp, source, timestamp }
 */
app.get('/api/prices/detailed', async (req, res) => {
  try {
    const prices = await getGoldPrices();
    
    if (!prices.success) {
      return res.status(500).json({ success: false, error: 'Failed to fetch prices' });
    }

    // إذا كان عندنا xauEgp، نحسب usdEgp من xauUsd و xauEgp
    const usdEgp = prices.xauEgp && prices.xauUsd 
      ? prices.xauEgp / prices.xauUsd 
      : 50; // قيمة افتراضية

    res.json({
      success: true,
      data: {
        xauUsd: prices.xauUsd,
        xauEgp: prices.xauEgp,
        usdEgp: usdEgp,
        source: prices.source,
        timestamp: prices.timestamp
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      '/health',
      '/api/prices',
      '/api/prices/detailed'
    ]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🥇 GOLD SCRAPER API RUNNING 🥇      ║
╠════════════════════════════════════════╣
║ Server:  http://localhost:${PORT}           ║
║ Health:  http://localhost:${PORT}/health      ║
║ API:     http://localhost:${PORT}/api/prices    ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
