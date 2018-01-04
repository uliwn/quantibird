import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  isLoading = true;
  isEditing = false;

  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);


  constructor(private surveyService: SurveyService,
              private auth: AuthService,
              private formBuilder: FormBuilder,
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


  enableEditing(survey: Survey) {
    this.isEditing = true;
    this.survey = survey;
  }

  cancelEditing() {
    this.isEditing = false;
    this.survey = new Survey();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the surveys to reset the editing
    this.getSurveys();
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

}
