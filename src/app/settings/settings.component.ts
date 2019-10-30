import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  name: string;
  project: string;
  emailTo: string;

  constructor(private router: Router,private activateRoute: ActivatedRoute,private ngZone: NgZone, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getInfo(this.activateRoute.snapshot.params['id']).subscribe(doc => {
      var json = doc.data();
      this.name = json.name;
      this.project = json.project;
      this.emailTo = json.emailTo;
    });
  }
  
  saveSettings(){
    this.usersService.saveSettings(this.activateRoute.snapshot.params['id']
    , this.name
    , this.emailTo
    , this.project
      );
    this.ngZone.run(() => this.router.navigate(['/home'])).then()
  }

  back(){
    this.ngZone.run(() => this.router.navigate(['/home'])).then()
  }
}
