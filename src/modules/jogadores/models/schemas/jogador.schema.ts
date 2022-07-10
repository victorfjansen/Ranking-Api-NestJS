import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    name: String,
    numberPhone: { type: String },
    email: { type: String, unique: true },
    ranking: String,
    rankingPosition: Number,
    photoUrl: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
