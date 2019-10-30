import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  periodColumns = ['date', 'start', 'end', 'elapsed'];
  taskColumns = ['description', 'duration'];

  periods: any[];
  tasks: any[];
  @Input() userID: number;
  constructor(private usersService: UsersService) {
  }
  ngOnChanges() {
    if (this.userID) {
      this.usersService.getAllPeriods(this.userID).subscribe(data => {
        this.periods = data.map(e => {
          return {
            data: e.payload.doc.data()
          };
        })
      });

      this.usersService.getAllTasks(this.userID).subscribe(data => {
        this.tasks = data.map(e => {
          return {
            data: e.payload.doc.data()
          };
        })
      });
    }
  }
  ngOnInit() {
  }

}
