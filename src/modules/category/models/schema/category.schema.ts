import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, unique: true },
    description: String,
    events: [
      {
        name: String,
        operations: String,
        value: Number,
      },
    ],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
  },
  { timestamps: true, collection: 'Categories' },
);
