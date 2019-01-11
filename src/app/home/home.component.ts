import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router"
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'WTT';
  name = 'clock';
  interval;
  isLogged = false;
  userID: string

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  running: boolean = false;
  start: any;
  end: any;

  displayName: string;

  constructor(private firebasedb: AngularFireAuth, private router: Router, private usersService: UsersService) {
    this.firebasedb.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        this.displayName = firebaseUser.email;
        this.isLogged = true;
        this.userID = this.firebasedb.auth.currentUser.uid;
        this.usersService.getInfo(this.firebasedb.auth.currentUser.uid).subscribe(doc => {
          if (!doc.exists || !doc.data().status) {
          } else {
            var json = doc.data().status;
            this.running = json.running;
            this.start = json.start;
            if (this.start) {
              this.calculateTime(this.start.toDate(), new Date(), json);
            }
            else {
              this.hours = json.hours;
              this.minutes = json.minutes;
              this.seconds = json.seconds;
            }
            if (this.running) {
              this.startTimer();
            }
          }
        });
      }
      else {
        this.isLogged = false;
        this.router.navigate(['']);
      }
    })
  }

  ngOnInit() {
  }



  changeStatus() {
    this.running = !this.running;
    if (this.running) {
      this.start = new Date();
      this.usersService.saveStatus(this.firebasedb.auth.currentUser.uid, this.hours, this.minutes, this.seconds, this.running, this.start);
      this.startTimer();
    } else {
      this.end = new Date();
      this.usersService.savePeriod(this.firebasedb.auth.currentUser.uid, this.start, this.end);
      this.usersService.saveStatus(this.firebasedb.auth.currentUser.uid, this.hours, this.minutes, this.seconds, false, null);
      this.pauseTimer();
    }

  }

  startTimer() {
    this.interval = setInterval(() => {
      this.increaseTime();
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  decreaseTime() {
    if (this.seconds > 0) {
      this.seconds--;
    } else if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    }
    else if (this.hours > 0) {
      this.hours--;
      this.minutes = 59;
    }
  }

  increaseTime() {
    if (this.seconds < 60) {
      this.seconds++;
    } else if (this.minutes < 60) {
      this.minutes++;
      this.seconds = 0;
    }
    else {
      this.hours++;
      this.minutes = 0;
    }
  }

  logout() {
    const promise = this.firebasedb.auth.signOut();
    promise.catch(e => console.log(e.message));
  }

  calculateTime(start: any, now: any, json: any): any {
    this.start = start;
    var elapsed = now - start
    var h;
    var m;
    var s;
    h = Math.floor(elapsed / 3600000);
    elapsed = elapsed - 3600000 * h;
    m = Math.floor(elapsed / 60000);
    elapsed = elapsed - 60000 * m;
    s = Number(elapsed / 1000).toFixed(0).toString();

    this.seconds = Number(s) + json.seconds;
    if(this.seconds > 59){
      this.seconds = this.seconds - 60;
      m++;
    }
    this.minutes = m + json.minutes;
    if(this.minutes > 59){
      this.minutes = this.minutes - 60;
      h++;
    }
    this.hours = h + json.hours;
  }
}