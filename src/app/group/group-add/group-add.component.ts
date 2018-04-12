import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Group } from '../../model/group';
import { GroupFormComponent } from '../group-form/group-form.component';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {

  @Output() onCreate = new EventEmitter<Group>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(GroupFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onCreate.emit(result);
      }
    });
  }
}
