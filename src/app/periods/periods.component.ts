import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {
  displayedColumns = ['start', 'end', 'elapsed'];
  dataSource: any[];
  @Input() userID: number;
  constructor(private usersService: UsersService) {
  }
  ngOnChanges() {
    if (this.userID) {
      this.usersService.getPeriods(this.userID).subscribe(data => {
        this.dataSource = data.map(e => {
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