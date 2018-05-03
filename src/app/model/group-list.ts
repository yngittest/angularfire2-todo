import { Group } from './group';

export class GroupList {
  groups: Group[];

  constructor(groups: Group[] = []) {
    this.groups = groups;
  }

  reset() {
    this.groups = [];
  }

  add(group: Group) {
    const index = this.groups.findIndex(({key}) => key === group.key);
    if (index < 0) {
      this.groups.push(group);
    } else {
      this.groups[index] = group;
    }
  }

  getName(key: string) {
    let groupName: string;
    this.groups
      .filter(group => {
        return group.key === key;
      })
      .map(group => {
        groupName = group.name;
      });
    return groupName;
  }

  getInbox() {
    let groupKey: string;
    if(this.groups) {
      this.groups
        .filter(group => {
          return group.type === 0;
        })
        .map(group => {
          groupKey = group.key;
        });
    }
    return groupKey;
  }
}
