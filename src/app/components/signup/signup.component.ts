import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { User } from '../../models/user';

@Component({
  selector: 'ons-page[signup]',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();

  constructor(private navi: OnsNavigator) { }

  ngOnInit() {
  }

}
