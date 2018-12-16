import * as express from 'express';

import SurveyCtrl from './controllers/survey';
import SurveyResultCtrl from './controllers/surveyResult';
import UserCtrl from './controllers/user';

export default function setRoutes(app) {

  const router = express.Router();

  const surveyCtrl = new SurveyCtrl();
  const surveyResultCtrl = new SurveyResultCtrl();
  const userCtrl = new UserCtrl();

  // Survey
  router.route('/surveys').get(surveyCtrl.getAll);
  router.route('/surveys/active').get(surveyCtrl.getActive);
  router.route('/surveys/:userId').get(surveyCtrl.getByUser);
  router.route('/surveys/count').get(surveyCtrl.count);
  router.route('/survey').post(surveyCtrl.insert);
  router.route('/survey/:id').get(surveyCtrl.get);
  router.route('/survey/:id').put(surveyCtrl.update);
  router.route('/survey/:id').delete(surveyCtrl.delete);

  // Survey Result
  router.route('/results').get(surveyResultCtrl.getAll);
  router.route('/result').post(surveyResultCtrl.insert);
  router.route('/result/:id').get(surveyResultCtrl.get);
  router.route('/result/survey/:surveyId').get(surveyResultCtrl.getBySurvey);

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
