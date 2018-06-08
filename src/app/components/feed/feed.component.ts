import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { User } from '../../models/user';
import * as ons from 'onsenui';

@Component({
  selector: 'ons-page[feed]',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  user: User = new User();
  loading: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }
}
