import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from "@angular/common";

import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LoadCurrencyDetails, LoadRateByDate } from '../../store/actions/rate.actions';
import { RateService } from '../../services/rate.service';
import { IAppState } from 'src/app/store/state/app.state';
import { getRateByDate, isRatesLoading } from 'src/app/store/selectors/rate.selectors';
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
  data: Observable<any> = this.store.pipe(select(getRateByDate));
  loading: Observable<boolean> = this.store.pipe(select(isRatesLoading));

  constructor(
    private store: Store<IAppState>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.store.dispatch(new LoadRateByDate(formatDate(this.date, 'dd.MM.yyyy', 'en-US')));
  }

  ngOnInit(): void {
    this.data.pipe(filter(data => !!data))
      .subscribe(data => {
        data = data?.filter(record => record.currency);
        data?.sort((a, b) => a?.currency === 'USD' ? -1 : a?.currency === 'EUR' ? -1 : a?.currency.localeCompare(b?.currency));
        if (data[0].purchaseRate) {
          data = data.map(record => ({
            ...record,
            rate_nb: record.saleRateNB,
            sale_privat: record.saleRate,
            purchase_privat: record.purchaseRate
          }));
        }
        this.dataSource = data;
      });

    this.loading.subscribe(isLoading => {
      this.showLoader = isLoading;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.isCurrentDateToday = formatDate(event.value, 'dd.MM.yyyy', 'en-US') === formatDate(new Date(), 'dd.MM.yyyy', 'en-US');
    this.store.dispatch(new LoadRateByDate(formatDate(event.value, 'dd.MM.yyyy', 'en-US')));
  }

  setDateToday(): void {
    this.date = new Date();
    this.isCurrentDateToday = true;
    this.store.dispatch(new LoadRateByDate(formatDate(this.date, 'dd.MM.yyyy', 'en-US')));

  }

  onSelectCurrency(currency: string): void {
    this.store.dispatch(new LoadCurrencyDetails(currency));
  }
}
