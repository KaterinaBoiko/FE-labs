import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChartConfigs } from 'src/app/shared/classes/chart';

import { RateService } from '../../services/rate.service';
import { CHART_COLORS } from '../../shared/constants/chart-configs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private unsubscribe = new Subject<void>();

  currency: string;
  showLoader: boolean = false;
  noData: boolean = false;
  details: any;
  chartDetails: ChartConfigs;
  colors = CHART_COLORS;

  constructor(
    private route: ActivatedRoute,
    private rateService: RateService
  ) { }

  ngOnInit(): void {
    this.currency = this.route.snapshot.paramMap.get('currency');
    this.getCurrencyDetails();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getCurrencyDetails(): void {
    this.showLoader = true;
    this.rateService.getCurrencyDetails(this.currency)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          this.showLoader = false;
          this.details = data;
          if (!this.details.data.length) {
            this.noData = true;
            return;
          }
          this.details.data.sort((a, b) => a.date > b.date ? 1 : -1);
          this.setChartDetails();
        },
        error => {
          this.showLoader = false;
          console.log(error);
        }
      );
  }

  setChartDetails(): void {
    const { data } = this.details;
    const datasets = [
      { label: 'PrivatBank purchase', data: [] },
      { label: 'NBU rate', data: [] },
      { label: 'PrivatBank sale', data: [] }
    ];
    const labels = [];
    data.forEach(row => {
      datasets[0].data.push(row.purchase_privat);
      datasets[1].data.push(row.rate_nb);
      datasets[2].data.push(row.sale_privat);

      labels.push(formatDate(row.date, 'dd.MM.yyyy', 'en-US'));
    });

    const options = this.setOptions(data);

    this.chartDetails = new ChartConfigs(datasets, labels, options);
  }

  setOptions(data): any {
    return {
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            fontColor: 'white',
          },
          gridLines: {
            color: '#5f5e5e'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white',
            min: Math.floor(Math.min(...data.map(row => row.purchase_privat ? row.purchase_privat : row.rate_nb), 100)),
            max: Math.ceil(Math.max(...data.map(row => row.sale_privat ? row.sale_privat : row.rate_nb), 0))
          },
          gridLines: {
            color: '#5f5e5e'
          },
          scaleLabel: {
            display: true,
            fontColor: 'white',
          }
        }]
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'white',
        },
      }
    };
  }

}
