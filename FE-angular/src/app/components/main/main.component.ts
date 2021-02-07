import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from "@angular/common";

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RateService } from '../../services/rate.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private unsubscribe = new Subject<void>();

  dataSource = [];
  date: Date = new Date('02.06.2021');
  showLoader: boolean = false;
  isCurrentDateToday: boolean = true;

  constructor(
    private rateService: RateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getRateByDate(this.date);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = new Date('02.06.2021');
  }

  setDateToday(): void {
    this.date = new Date();
    this.isCurrentDateToday = true;
    this.getRateByDate(this.date);
  }

  getRateByDate(date: Date | string) {
    this.showLoader = true;
    const dateString = formatDate(date, 'dd.MM.yyyy', 'en-US');
    this.rateService.getRateByDate(dateString)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          data.exchangeRate.sort((a, b) => a.currency === 'USD' ? -1 : a.currency === 'EUR' ? -1 : a.currency.localeCompare(b.currency));
          this.dataSource = data.exchangeRate;
          this.showLoader = false;
        },
        error => {
          this.showLoader = false;
        }
      );
  }

}
