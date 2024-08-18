import { Component, ElementRef, ViewChild } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats: any;

  expenses: any;
  incomes: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  @ViewChild('incomeLineChartRef') private incomeLineChartRef: ElementRef;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef: ElementRef;

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
  }

  createLineChart() {
    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
    new Chart(incomeCtx, {
      type: 'line',
      data: {
        labels: this.incomes.map((income) => income.date),
        datasets: [
          {
            label: 'Income',
            data: this.incomes.map((income) => income.amount),
            borderWidth: 1,
            backgroundColor: 'rgb(80, 200, 120)',
            borderColor: 'rgb(0, 100, 0)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
    new Chart(expenseCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map((income) => income.date),
        datasets: [
          {
            label: 'Expenses',
            data: this.expenses.map((income) => income.amount),
            borderWidth: 1,
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgb(255, 0, 0)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getStats() {
    this.statsService.getStats().subscribe((res) => {
      console.log(res);
      this.stats = res;
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe((res) => {
      if (res.expenseList != null && res.incomeList != null) {
        this.incomes = res;
        this.expenses = res.expenseList;
        console.log(res);

        this.createLineChart();
      }
    });
  }
}
