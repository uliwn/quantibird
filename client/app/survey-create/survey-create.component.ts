import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Survey } from '../shared/models/survey.model';
import { AuthService } from '../services/auth.service';

import * as _ from 'lodash';

declare const $: any;

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
  questionCount = 0;

  addAnswerForm: FormGroup;
  answerTitle = new FormControl('', Validators.required);
  answerCount = 0;

  editValue = null;


  constructor(private surveyService: SurveyService,
              private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }


  ngOnInit() {
    $.material.init();

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

    const survey = this.addSurveyForm.value;
    survey.userId = this.auth.currentUser._id;
    survey.questions = this.questions;
    survey.actvie = false;

    this.surveyService.addSurvey(survey).subscribe(
      res => {
        this.surveys.push(res);
        this.questions = [];
        this.addSurveyForm.reset();
        this.toast.setMessage('Umfrage erfolgreich erstellt.', 'success');
        this.router.navigate(['/surveys']);
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
    question.key = this.questionCount++;
    question.answers = _.cloneDeep(this.answers);
    this.questions.push(question);

    this.addQuestionForm.reset();
  }

  addAnswer() {
    const answer = this.addAnswerForm.value;
    answer.key = this.answerCount++;
    this.answers.push(answer);

    this.addAnswerForm.reset();
  }

  deleteQuestion(question) {
    _.remove(this.questions, q => q.key === question.key);
  }

  setEditValue(value) {
    this.editValue = value;
  }

  deleteAnswer(answer) {
    _.remove(this.answers, a => a.key === answer.key);
  }

  deleteAnswerInQuestion(question, answer) {
    _.remove(question.answers, (a: any) => a.key === answer.key);
  }

}
