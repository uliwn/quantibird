import SurveyResult from '../models/surveyResult';
import BaseCtrl from './base';

export default class SurveyResultCtrl extends BaseCtrl {
  model = SurveyResult;

  getBySurvey = (req, res) => {
    this.model.find({ surveyId: req.params.surveyId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

}
