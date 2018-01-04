import SurveyResult from '../models/surveyResult';
import BaseCtrl from './base';

export default class SurveyResultCtrl extends BaseCtrl {
  model = SurveyResult;

  getByUser = (req, res) => {
    this.model.find({ userId: req.params.userId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

}
