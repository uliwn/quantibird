import Cat from '../models/cat';
import BaseCtrl from './base';

export default class CatCtrl extends BaseCtrl {
  model = Cat;

  getByUser = (req, res) => {
    this.model.find({ userId: req.params.userId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

}
