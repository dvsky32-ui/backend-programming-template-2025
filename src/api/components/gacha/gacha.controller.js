const { Reward, GachaLog } = require('../../../models');

// 🎯 GACHA
const gacha = async (req, res) => {
  try {
    const { userId } = req.body;

    const today = new Date().toISOString().slice(0, 10);

    const count = await GachaLog.countDocuments({ userId, date: today });

    if (count >= 5) {
      return res.status(400).json({
        message: 'Limit gacha harian tercapai',
      });
    }

    const rewards = await Reward.find({
      $expr: { $lt: ['$claimed', '$quota'] },
    });

    let rewardWon = null;

    if (Math.random() < 0.2 && rewards.length > 0) {
      rewardWon = rewards[Math.floor(Math.random() * rewards.length)];

      rewardWon.claimed += 1;
      await rewardWon.save();
    }

    await GachaLog.create({
      userId,
      date: today,
      rewardId: rewardWon ? rewardWon._id : null,
    });

    res.json({
      message: rewardWon ? 'Menang!' : 'Zonk',
      reward: rewardWon ? rewardWon.name : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📜 HISTORY
const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await GachaLog.find({ userId })
      .populate('rewardId') // optional (biar dapet detail hadiah)
      .sort({ createdAt: -1 }); // terbaru dulu

    res.status(200).json({
      message: 'Berhasil ambil history',
      data: history,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { gacha, getHistory };
