import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnChanges {
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType: string = 'horizontalBar';
  barChartLegend: boolean = true;
  barChartLabels: string[];
  barChartData: any[];

  @Input() groupSets: any[];
  @Input() members: any[];

  constructor() {}

  ngOnChanges() {
    const groupCounts = this.groupSets.map(groupSet => {
      const groupCount = { key: groupSet.key };
      Object.keys(groupSet.members).forEach(userId => {
        groupCount[userId] = 0;
      });
      groupSet.todos.forEach(todo => {
        groupCount[todo.completedBy]++;
      });
      return groupCount;
    });

    const labels = this.groupSets.map(groupSet => {
      return groupSet.name;
    });

    const data = this.members.map(user => {
      return { data: [], label: user.name };
    });
    groupCounts.forEach(groupCount => {
      this.members.forEach(user => {
        const index = data.findIndex(({label}) => label === user.name);
        const count = groupCount[user.key] || 0;
        data[index].data.push(count);
      });
    });

    this.barChartLabels = labels;
    setTimeout(() => {
      this.barChartData = data;
    }, 50);
  }

}
