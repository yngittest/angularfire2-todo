import { Injectable } from '@angular/core';

import { Group } from '../../model/group';

@Injectable()
export class GroupService {
  groups: Group[];

  constructor() { }

  setGroups(groups: Group[]) {
    this.groups = groups;
  }

  getGroups() {
    return this.groups;
  }

}
