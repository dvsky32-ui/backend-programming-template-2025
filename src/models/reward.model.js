module.exports = (mongoose) => {
  const rewardSchema = new mongoose.Schema({
    name: String,
    quota: Number,
    claimed: {
      type: Number,
      default: 0,
    },
  });

  return mongoose.model('Reward', rewardSchema);
};
