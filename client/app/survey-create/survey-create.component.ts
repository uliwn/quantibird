import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SurveyService } from '../services/survey.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Survey } from '../shared/models/survey.model';
import { AuthService } from '../services/auth.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.scss']
})
export class SurveyCreateComponent implements OnInit {

  survey = new Survey();
  surveys: Survey[] = [];
  questions = [];
  answers = [];
  isEditing = false;
  isLoading = false;

  addSurveyForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  addQuestionForm: FormGroup;
  questionTitle = new FormControl('', Validators.required);

  addAnswerForm: FormGroup;
  answerTitle = new FormControl('', Validators.required);


  constructor(private surveyService: SurveyService,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }


  ngOnInit() {
    this.addSurveyForm = this.formBuilder.group({
      name: this.name,
      description: this.description
    });
    this.addQuestionForm = this.formBuilder.group({
      title: this.questionTitle
    });
    this.addAnswerForm = this.formBuilder.group({
      title: this.answerTitle
    });
  }

  saveSurvey() {
    this.isLoading = true;

    const body = this.addSurveyForm.value;
    body.userId = this.auth.currentUser._id;
    body.questions = this.questions;

    this.surveyService.addSurvey(body).subscribe(
      res => {
        this.surveys.push(res);
        this.questions = [];
        this.addSurveyForm.reset();
        this.toast.setMessage('Survey added successfully.', 'success');
      },
      error => {
        console.log(error);
        this.isLoading = false;
      },
      () => this.isLoading = false
    );
  }

  addQuestion() {
    const question = this.addQuestionForm.value;
    question.key = this.questions.length;
    question.answers = _.clone(this.answers);
    this.questions.push(question);

    this.addQuestionForm.reset();
  }

  addAnswer() {
    const answer = this.addAnswerForm.value;
    answer.key = this.answers.length;
    this.answers.push(answer);

    this.addAnswerForm.reset();
  }

  enableEditing(survey: Survey) {
    this.isEditing = true;
    this.survey = survey;
  }

  cancelEditing() {
    this.isEditing = false;
    this.survey = new Survey();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the surveys to reset the editing
  }

  editSurvey(survey: Survey) {
    this.surveyService.editSurvey(survey).subscribe(
      () => {
        this.isEditing = false;
        this.survey = survey;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteSurvey(survey: Survey) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.surveyService.deleteSurvey(survey).subscribe(
        () => {
          const pos = this.surveys.map(elem => elem._id).indexOf(survey._id);
          this.surveys.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  deleteQuestion(question) {
    _.remove(this.questions, q => q.key === question.key);
  }

  editAnswer(answer) {
    this.addAnswerForm.setValue({title: answer.title});
  }

  deleteAnswer(answer) {
    _.remove(this.answers, a => a.key === answer.key);
  }

}
