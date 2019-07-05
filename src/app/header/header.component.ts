import { Component, OnInit, Input } from '@angular/core';
import { MatMenuPanel } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('matMenuTriggerFor') menu: MatMenuPanel<any>
  constructor() { }

  ngOnInit() {
  }

}
