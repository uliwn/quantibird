import { Component, OnInit, Input } from '@angular/core';
import * as Chartist from 'chartist';
import * as _ from 'lodash';

@Component({
  selector: 'app-pie-chart-result',
  templateUrl: './pie-chart-result.component.html',
  styleUrls: ['./pie-chart-result.component.scss']
})
export class PieChartResultComponent implements OnInit {
  @Input() chartid: string;
  @Input() title: string;
  @Input() answergroup: any;

  answers: any = [];

  constructor() {
  }

  ngOnInit() {
    const series = [];

    _.each(this.answergroup, (answers) => {
      _.each(answers, (ar, i) => {
        let answer = this.answers[i];
        if (!answer) {
          answer = {};
          answer.title = ar.title;
          answer.count = 0;
          series[i] = 0;
          this.answers[i] = answer;
        }
        if (ar.selected) {
          answer.count = answer.count + 1;
          series[i] = answer.count;
        }
      });
    });

    const dataDailySalesChart: any = {
      series,
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    };

    setTimeout(() => {
      const dailySalesChart = new Chartist.Pie(`#${this.chartid}`, dataDailySalesChart, optionsDailySalesChart);
    }, 0);
  }

}
