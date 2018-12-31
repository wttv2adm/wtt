import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() userID: number;

  constructor() { }

  ngOnInit() {
  }

}
