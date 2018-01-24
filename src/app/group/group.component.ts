import { Component, OnInit, TemplateRef } from '@angular/core';

import { Group } from '../model/group';

import { FirebaseService } from '../service/firebase/firebase.service';
import { GroupService } from '../service/group/group.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-group',
  providers: [
    FirebaseService
  ],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: Group[];
  bsModalRef: BsModalRef;
  // selected: Group;
  subscription: any;

  constructor(private firebase: FirebaseService, private group: GroupService, private modalService: BsModalService) { }

  ngOnInit() {
    this.subscription = this.firebase.getItems('/groups', { query: { orderByChild: 'type' }}).subscribe((snapshots: any[]) => {
      this.groups = [];
      snapshots.forEach((snapshot: any) => {
        this.groups.push(new Group(snapshot.name, snapshot.archived, snapshot.type).setKey(snapshot.$key));
      });
      this.group.setGroups(this.groups);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addGroup(group: Group) {
    this.firebase.addItem(group);
    this.bsModalRef.hide();
  }

  updateGroup(group: Group) {
    this.firebase.updateItem(group);
  }

  deleteGroup(group: Group) {
    this.firebase.deleteItem(group);
  }

  // editGroup(group: Group) {
  //   this.selected = todo;
  // }

  // onEdited(group: Group) {
  //   if(group) {
  //     this.updateGroup(group);
  //   }
  //   this.selected = null;
  //   this.bsModalRef.hide();
  // }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

}
