import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit, OnChanges {
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType: string = 'horizontalBar';
  barChartLegend: boolean = true;

  barChartLabels: string[];
  barChartData: any[] = [{data: [], label: 'init'}];

  @Input() groupSets: any[];

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.groupSets) {
      if(this.groupSets.length > 0) {
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

        const allMembers = [];
        this.groupSets.forEach(groupSet => {
          Object.keys(groupSet.members).forEach(userId => {
            const index = allMembers.findIndex(({key}) => key === userId);
            if(index < 0) {
              allMembers.push({
                key: userId,
                name : groupSet.members[userId].name
              });
            }
          });
        });

        const labels = this.groupSets.map(groupSet => {
          return groupSet.name;
        });

        const data = allMembers.map(user => {
          return { data: [], label: user.name };
        });
        groupCounts.forEach(groupCount => {
          allMembers.forEach(user => {
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
  }

}
