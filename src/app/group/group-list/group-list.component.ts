import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Group } from '../../model/group';
import { GroupEditComponent } from '../group-edit/group-edit.component';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  selected: Group;

  @Input() groups: Group[];

  @Output() onUpdate = new EventEmitter<Group>();
  @Output() onDelete = new EventEmitter<Group>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  updateGroup(group: Group) {
    this.onUpdate.emit(group);
  }

  deleteGroup(group: Group) {
    this.onDelete.emit(group);
  }

  editGroup(group: Group) {
    this.selected = group;
  }

  openDialog() {
    let dialogRef = this.dialog.open(GroupEditComponent, {
      data: { group: this.selected }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.type === 'update') {
        this.updateGroup(result.data);
      } else if(result.type === 'delete') {
        this.deleteGroup(this.selected);
      }
      this.selected = null;
    });
  }

}
