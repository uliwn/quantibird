import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Survey } from '../shared/models/survey.model';
import { User } from '../shared/models/user.model';

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }

  getAllSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>('/api/surveys');
  }

  getSurveys(user: User): Observable<Survey[]> {
    return this.http.get<Survey[]>(`/api/surveys/${user._id}`);
  }

  countSurveys(): Observable<number> {
    return this.http.get<number>('/api/surveys/count');
  }

  addSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>('/api/survey', survey);
  }

  getSurvey(survey: Survey): Observable<Survey> {
    return this.http.get<Survey>(`/api/survey/${survey._id}`);
  }

  editSurvey(survey: Survey): Observable<string> {
    return this.http.put(`/api/survey/${survey._id}`, survey, { responseType: 'text' });
  }

  deleteSurvey(survey: Survey): Observable<string> {
    return this.http.delete(`/api/survey/${survey._id}`, { responseType: 'text' });
  }

}
