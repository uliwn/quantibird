import * as mongoose from 'mongoose';

const surveyResultSchema = new mongoose.Schema({
  surveyId: String,
  userId: String,
  questions: [{ key: Number, title: String, answers: [{ key: Number, title: String, selected: Boolean }] }],
  createdAt: { type: Date, default: Date.now }
});

const SurveyResult = mongoose.model('SurveyResult', surveyResultSchema);

export default SurveyResult;
