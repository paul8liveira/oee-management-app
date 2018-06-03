import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}