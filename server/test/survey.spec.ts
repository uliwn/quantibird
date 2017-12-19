import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Survey from '../models/survey';

const should = chai.use(chaiHttp).should();

describe('Surveys', () => {

  beforeEach(done => {
    Survey.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for surveys', () => {

    it('should get all the surveys', done => {
      chai.request(app)
        .get('/api/surveys')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get surveys count', done => {
      chai.request(app)
        .get('/api/surveys/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new survey', done => {
      const survey = new Survey({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/survey')
        .send(survey)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a survey by its id', done => {
      const survey = new Survey({ name: 'Survey', weight: 2, age: 4 });
      survey.save((error, newSurvey) => {
        chai.request(app)
          .get(`/api/survey/${newSurvey.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newSurvey.id);
            done();
          });
      });
    });

    it('should update a survey by its id', done => {
      const survey = new Survey({ name: 'Survey', weight: 2, age: 4 });
      survey.save((error, newSurvey) => {
        chai.request(app)
          .put(`/api/survey/${newSurvey.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a survey by its id', done => {
      const survey = new Survey({ name: 'Survey', weight: 2, age: 4 });
      survey.save((error, newSurvey) => {
        chai.request(app)
          .delete(`/api/survey/${newSurvey.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


