import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getRateByDate(date: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/rate/${date}`);
  }
}
