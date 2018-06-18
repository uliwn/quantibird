import { Component, OnInit, Input } from '@angular/core';
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
  @Input() data: Survey;

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

    if (this.data) {
      this.questions = this.data.questions;
    }
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

  setEditValue(value) {
    this.editValue = value;
  }

  deleteAnswer(answer) {
    _.remove(this.answers, a => a.key === answer.key);
  }

  deleteAnswerInQuestion(question, answer) {
    _.remove(question.answers, (a: any) => a.key === answer.key);
  }

  showMessage() {
    this.toast.setMessage('Umfrage erfolgreich erstellt', 'success');
  }

}
