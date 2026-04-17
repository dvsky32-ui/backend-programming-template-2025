const express = require('express');

const app = express();

const routes = require('./api/routes');
const { Reward } = require('./models');

app.use(express.json());

// test
app.get('/', (req, res) => {
  res.send('API jalan');
});

// seed reward
const seedRewards = async () => {
  const count = await Reward.countDocuments();

  if (count === 0) {
    await Reward.insertMany([
      { name: 'Emas 10 gram', quota: 1 },
      { name: 'Smartphone X', quota: 5 },
      { name: 'Smartwatch Y', quota: 10 },
      { name: 'Voucher Rp100.000', quota: 100 },
      { name: 'Pulsa Rp50.000', quota: 500 },
    ]);
    console.log('Seed reward berhasil');
  }
};

seedRewards();

// 🔥 REGISTER ROUTES
routes(app);

// 🚀 START SERVER
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
