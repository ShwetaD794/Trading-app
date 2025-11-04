const mongoose = require('mongoose');

const OneTimeKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
});

const OneTimeKeyModel = mongoose.model('OneTimeKey', OneTimeKeySchema);
module.exports = { OneTimeKeyModel };
