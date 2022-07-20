import mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateHourChallenge: Date,
    status: String,
    dateHourSolicitation: Date,
    dateHourResponse: Date,
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogadores' },
    category: String,
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogadores',
      },
    ],
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matchs',
    },
  },
  { timestamps: true, collection: 'challenges' },
);
