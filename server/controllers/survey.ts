import Survey from '../models/survey';
import BaseCtrl from './base';

export default class SurveyCtrl extends BaseCtrl {
  model = Survey;

  getByUser = (req, res) => {
    this.model.find({ userId: req.params.userId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  getActive = (req, res) => {
    this.model.find({ active: true }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

}
