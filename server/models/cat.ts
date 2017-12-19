import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  description: String,
  questions: [{ key: Number, title: String, answers: [{ key: Number, title: String }] }],
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
