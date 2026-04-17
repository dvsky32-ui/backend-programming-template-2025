const express = require('express');

const router = express.Router();

// ⬇️ tambahin getHistory
const { gacha, getHistory } = require('./gacha.controller');

// 🎯 gacha
router.post('/gacha', gacha);

// 📜 history
router.get('/gacha/history/:userId', getHistory);

module.exports = router;
