import mongoose from 'mongoose';

const dashboardLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshedAt: {
      type: Date,
      default: Date.now,
    },
    coins: {
      type: Number,
      default: 0,
    },
    newsCount: {
      type: Number,
      default: 0,
    },
    memeUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('DashboardLog', dashboardLogSchema);
