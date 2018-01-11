import { Component } from '@angular/core';

import { Group } from './model/group';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  groups: Group[];

  constructor(private auth: AuthService) { }

  onGetGroup(groups: Group[]) {
    this.groups = groups;
  }
}
