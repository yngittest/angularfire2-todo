import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GroupFormComponent>,
  ) { }

  ngOnInit() { }

  create() {
    if (this.name) {
      let group: Group;
      group = new Group(this.name);
      this.dialogRef.close(group);
      this.name = null;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
