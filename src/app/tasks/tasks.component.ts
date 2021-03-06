import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  displayedColumns = ['description', 'duration'];
  // dataSource = ELEMENT_DATA;
  dataSource: any[];
  description: string;
  duration: string;
  @Input() userID: number;
  constructor(private usersService: UsersService) {
  }
  ngOnChanges() {
    if (this.userID) {
      this.usersService.getTasks(this.userID).subscribe(data => {
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

  addTask() {
    this.description = encodeURI(this.description)
    this.description = this.description.replace(/%0A/g,'<br>');
    this.description = decodeURI(this.description);
    this.usersService.saveTask(this.userID, this.description, this.duration);
    this.description = '';
    this.duration = '';
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

