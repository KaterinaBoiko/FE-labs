import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  getCurrencyPairs(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/currency-pairs`);
  }

  convert(amount: number, currency: string, base_currency: string): Observable<any> {
    const params = new HttpParams()
      .append('amount', amount.toString())
      .append('currency', currency)
      .append('base_currency', base_currency);

    return this.http.get(
      `${this.apiUrl}/convert`, { params });
  }

  getCurrencyDetails(currency: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/details/${currency}`);
  }
}
