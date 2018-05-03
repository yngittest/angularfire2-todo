import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../model/group';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  name: string;
  type: number;
  archived: boolean;
  members: any;
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GroupEditComponent>
  ) { }

  ngOnInit() {
    this.name = this.data.group.name;
    this.type = this.data.group.type;
    this.archived = this.data.group.archived;
    this.members = this.data.group.members;
    this.result = {
      type: 'cancel',
      data: null
    };
  }

  update() {
    if (this.name) {
      const editedGroup = new Group({
        name: this.name,
        type: this.type,
        archived: this.archived,
        members: this.members
      });
      editedGroup.key = this.data.group.key;
      this.result.type = 'update';
      this.result.data = editedGroup;
      this.dialogRef.close(this.result);
    }
  }

  delete() {
    this.result.type = 'delete';
    this.dialogRef.close(this.result);
  }

  cancel() {
    this.dialogRef.close(this.result);
  }

}
