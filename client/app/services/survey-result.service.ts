import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Survey } from '../shared/models/survey.model';
import { SurveyResult } from '../shared/models/survey-result.model';

@Injectable()
export class SurveyResultService {

  constructor(private http: HttpClient) { }

  getSurveyResult(id: string): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`/api/result/survey/${id}`);
  }

}
