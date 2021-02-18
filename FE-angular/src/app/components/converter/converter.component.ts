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
  currencies: { code: string; title: number; }[] = [];
  baseCurrencies: { code: string; title: number; }[] = [];

  selectedCurrency: { code: string; title: number; };
  selectedBaseCurrency: { code: string; title: number; };
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
          this.baseCurrencies.push({ code: data[0].base_currency, title: data[0].base_currency_title });
          this.selectedBaseCurrency = this.baseCurrencies[0];
          this.currencies = data
            .map(item => {
              return { code: item.currency, title: item.currency_title };
            })
            .sort((a, b) => a.code === 'USD' ? -1 : a.code === 'EUR' ? -1 : a.code.localeCompare(b.code));

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
      this.rateService.convert(this.amount, this.selectedCurrency.code, this.selectedBaseCurrency.code)
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
