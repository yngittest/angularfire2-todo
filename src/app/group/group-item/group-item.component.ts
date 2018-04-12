import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Group } from '../../model/group';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  @Input() group: Group;

  @Output() onUpdate = new EventEmitter<Group>();
  @Output() onEdit = new EventEmitter<Group>();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.onUpdate.emit(this.group);
  }

  edit() {
    this.onEdit.emit(this.group);
  }

}
