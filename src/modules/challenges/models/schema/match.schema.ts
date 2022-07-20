import mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
  {
    category: String,
    players: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jogadores',
    },
    def: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jogadores',
    },
    result: [
      {
        set: String,
      },
    ],
  },
  { timestamps: true, collection: 'matches' },
);
