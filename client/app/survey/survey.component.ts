import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Survey } from '../shared/models/survey.model';
import { AuthService } from '../services/auth.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  survey = new Survey();
  surveys: Survey[] = [];

  questions = null;
  editValue = null;

  isLoading = true;
  isEditing = false;


  constructor(private surveyService: SurveyService,
              private auth: AuthService,
              private router: Router,
              public toast: ToastComponent) { }


  ngOnInit() {
    this.getSurveys();
  }

  getSurveys() {
    this.surveyService.getSurveys(this.auth.currentUser).subscribe(
      data => this.surveys = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  showResult(survey) {
    this.router.navigate(['/survey/result', survey._id]);
  }

  setEditValue(value) {
    this.editValue = value;
  }

  enableEditing(survey: Survey, e: Event) {
    this.isEditing = true;
    this.survey = survey;
    this.questions = survey.questions;

    e.stopPropagation();
  }

  toggleStatus(survey: Survey, e: Event) {
    e.stopPropagation();

    survey.active = !survey.active;
    this.editSurvey(survey);
  }

  cancelEditing() {
    this.isEditing = false;
    this.survey = new Survey();

    // this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the surveys to reset the editing
    this.getSurveys();
  }

  editSurvey(survey: Survey) {
    this.surveyService.editSurvey(survey).subscribe(
      () => {
        this.isEditing = false;
        this.survey = survey;
        this.toast.setMessage('Umfrage wurde erfolgreich bearbeitet.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteSurvey(survey: Survey, e: Event) {
    if (window.confirm('Sind Sie sicher, dass Sie diese Umfrage löschen möchten?')) {
      this.surveyService.deleteSurvey(survey).subscribe(
        () => {
          const pos = this.surveys.map(elem => elem._id).indexOf(survey._id);
          this.surveys.splice(pos, 1);
          this.toast.setMessage('Umfrage erfolgreich gelöscht.', 'success');
        },
        error => console.log(error)
      );
    }
    e.stopPropagation();
  }

}
