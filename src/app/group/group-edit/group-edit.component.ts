import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Group } from '../../model/group';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  name: string;
  archived: boolean;
  type: number;

  @Input() group: Group;

  @Output() edited = new EventEmitter<Group>();

  constructor() { }

  ngOnInit() {
    this.name = this.group.data.name;
  }

  update() {
    if(this.name) {
      let editedGroup = new Group(this.name);
      editedGroup.key = this.group.key;
      this.edited.emit(editedGroup);
    }
  }

  cancel() {
    this.edited.emit();
  }

}
