module.exports = (db) =>
  db.model(
    'GachaLog',
    db.Schema(
      {
        userId: {
          type: String, // ⚠️ samakan dengan controller lo
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        rewardId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Reward',
          default: null,
        },
      },
      {
        timestamps: true, // penting untuk sorting
      }
    )
  );
