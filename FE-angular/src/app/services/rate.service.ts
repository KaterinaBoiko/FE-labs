import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { rates } from '../constants/rate-06.02';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(
    private http: HttpClient
  ) { }

  getRateByDate(date: string): Observable<any> {
    return of(rates);
  }
}
