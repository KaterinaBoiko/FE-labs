import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RateService } from '../../services/rate.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  private unsubscribe = new Subject<void>();

  showLoader: boolean = false;
  currencies: string[] = [];
  baseCurrencies: string[] = [];

  selectedCurrency: string;
  selectedBaseCurrency: string;
  amount: number;

  rateNBU: number;
  revertedRateNBU: number;
  totalAmount: number;
  amountCopy: number;

  constructor(
    private rateService: RateService
  ) { }

  ngOnInit(): void {
    this.getCurrencyPairs();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getCurrencyPairs(): void {
    this.showLoader = true;
    this.rateService.getCurrencyPairs()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          this.baseCurrencies.push('UAH');
          this.selectedBaseCurrency = this.baseCurrencies[0];
          this.currencies = data
            .map(item => item.currency)
            .sort((a, b) => a === 'USD' ? -1 : a === 'EUR' ? -1 : a.localeCompare(b.code));

          this.selectedCurrency = this.currencies[0];
          this.amount = 10;
          this.showLoader = false;
        },
        error => {
          console.log(error);
          this.showLoader = false;
        }
      );
  }

  convert(): void {
    if (this.amount && this.selectedCurrency && this.selectedBaseCurrency) {
      this.rateService.convert(this.amount, this.selectedCurrency, this.selectedBaseCurrency)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          data => {
            const { result, rate, reverted_rate } = data;
            this.amountCopy = this.amount;
            this.totalAmount = result;
            this.rateNBU = rate;
            this.revertedRateNBU = reverted_rate;
            this.showLoader = false;
          },
          error => {
            console.log(error);
            this.showLoader = false;
          }
        );
    }
  }

  swapCurrencies(): void {
    [this.selectedBaseCurrency, this.selectedCurrency] = [this.selectedCurrency, this.selectedBaseCurrency];
    [this.baseCurrencies, this.currencies] = [this.currencies, this.baseCurrencies];

    this.convert();
  }

}
