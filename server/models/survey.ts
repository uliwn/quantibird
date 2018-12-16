import * as mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  name: String,
  description: String,
  questions: [{ key: Number, title: String, answers: [{ key: Number, title: String }] }],
  userId: String,
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
