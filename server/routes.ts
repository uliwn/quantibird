import * as express from 'express';

import SurveyCtrl from './controllers/servey';
import UserCtrl from './controllers/user';
import Survey from './models/survey';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const surveyCtrl = new SurveyCtrl();
  const userCtrl = new UserCtrl();

  // Survey
  router.route('/surveys').get(surveyCtrl.getAll);
  router.route('/surveys/:userId').get(surveyCtrl.getByUser);
  router.route('/surveys/count').get(surveyCtrl.count);
  router.route('/survey').post(surveyCtrl.insert);
  router.route('/survey/:id').get(surveyCtrl.get);
  router.route('/survey/:id').put(surveyCtrl.update);
  router.route('/survey/:id').delete(surveyCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
