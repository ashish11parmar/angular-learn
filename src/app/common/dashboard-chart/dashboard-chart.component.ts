import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.css'
})
export class DashboardChartComponent {
  @ViewChild('barCanvas') chartDisplayId: ElementRef | any;
  @Input('chartDetails') chartDetails: any;
  allChartObj: any;


  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {   /** @note This function will generate dataset according to Chart type */
    this.allChartObj = new Chart(this.chartDisplayId.nativeElement, {
      type: this.chartDetails.type,
      data: {
        labels: this.chartDetails.labels,
        datasets: [
          {
            data: this.chartDetails.datasets[0].data,
            backgroundColor: this.chartDetails.datasets[0].backgroundColor,
            borderColor: this.chartDetails.datasets[0].borderColor,
            borderWidth: this.chartDetails.datasets[0].borderWidth
          },
        ]
      }
    });
  }

}
