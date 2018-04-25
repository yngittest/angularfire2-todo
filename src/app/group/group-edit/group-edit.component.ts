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
  archived: boolean;
  type: number;
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GroupEditComponent>
  ) { }

  ngOnInit() {
    this.name = this.data.group.data.name;
    this.result = {
      type: 'cancel',
      data: null
    };
  }

  update() {
    if (this.name) {
      const editedGroup = new Group({name: this.name});
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
