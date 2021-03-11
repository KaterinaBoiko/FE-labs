import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from "@angular/common";

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GetSelectedCurrency } from '../../store/actions/rate.actions';
import { RateService } from '../../services/rate.service';
import { IAppState } from 'src/app/store/state/app.state';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private unsubscribe = new Subject<void>();

  dataSource = [];
  date: Date = new Date();
  showLoader: boolean = false;
  isCurrentDateToday: boolean = true;

  constructor(
    private store: Store<IAppState>,
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
    this.isCurrentDateToday = formatDate(event.value, 'dd.MM.yyyy', 'en-US') === formatDate(new Date(), 'dd.MM.yyyy', 'en-US');
    this.getRateByDate(event.value);
  }

  setDateToday(): void {
    this.date = new Date();
    this.isCurrentDateToday = true;
    this.getRateByDate(this.date);
  }

  onSelectCurrency(currency: string): void {
    this.store.dispatch(new GetSelectedCurrency(currency));
  }

  getRateByDate(date: Date | string) {
    this.showLoader = true;
    const dateString = formatDate(date, 'dd.MM.yyyy', 'en-US');
    this.rateService.getRateByDate(dateString)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          data = data.filter(record => record.currency);
          data?.sort((a, b) => a?.currency === 'USD' ? -1 : a?.currency === 'EUR' ? -1 : a?.currency.localeCompare(b?.currency));
          if (data[0].purchaseRate) {
            data.forEach(record => {
              record.rate_nb = record.saleRateNB;
              record.purchase_privat = record.saleRate;
              record.purchase_privat = record.purchaseRate;
            });
          }
          this.dataSource = data;
          this.showLoader = false;
        },
        error => {
          this.showLoader = false;
        }
      );
  }

}
