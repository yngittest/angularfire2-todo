import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Group } from '../../model/group';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  name: string;
  archived: string;
  type: string;

  @Output() submit = new EventEmitter<Group>();

  constructor() { }

  ngOnInit() { }

  create() {
    if(this.name) {
      let group: Group;
      group = new Group(this.name);
      this.submit.emit(group);
      this.name = null;
    }
  }

}
