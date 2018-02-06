import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

import { Group } from '../../model/group';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  selected: Group;
  bsModalRef: BsModalRef;

  @Input() groups: Group[];

  @Output() onCreate = new EventEmitter<Group>();
  @Output() onUpdate = new EventEmitter<Group>();
  @Output() onDelete = new EventEmitter<Group>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addGroup(group: Group) {
    this.onCreate.emit(group);
    this.bsModalRef.hide();
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

  onEdited(group: Group) {
    if (group) {
      this.updateGroup(group);
    }
    this.selected = null;
    this.bsModalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

}
