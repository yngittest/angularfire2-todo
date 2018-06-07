import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-sharing-todo',
  templateUrl: './sharing-todo.component.html',
  styleUrls: ['./sharing-todo.component.css']
})
export class SharingTodoComponent implements OnChanges {
  pieChartType: string = 'pie';
  pieChartLegend: boolean = false;
  pieChartLabels: string[];
  pieChartData: number[];

  @Input() todoTitle: any;

  constructor() { }

  ngOnChanges() {
    const pieChartLabels = [];
    const pieChartData = [];
    Object.keys(this.todoTitle.users).forEach(key => {
      pieChartLabels.push(this.todoTitle.users[key].name);
      pieChartData.push(this.todoTitle.users[key].count);
    });
    this.pieChartLabels = pieChartLabels;
    setTimeout(() => {
      this.pieChartData = pieChartData;
    }, 50);
  }
}
