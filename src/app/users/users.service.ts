import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firebasedb: AngularFirestore) { }

  getUsers() {
    return this.firebasedb.collection('Users').snapshotChanges();
  }

  saveUser(userID, email) {
    this.firebasedb.collection('Users').doc(userID).set({
      email: email
    });
  }

  getInfo(userID) {
    return this.firebasedb.collection('Users').doc(userID).get();
  }

  saveStatus(userID: any, hours: any, minutes: any, seconds: any, running: any, start: any): any {
    this.firebasedb.collection('Users').doc(userID).update({
      status: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        running: running,
        start: start
      }
    });
  }

  savePeriod(userID: any, start: any, end: any) {
    var today = new Date();
    var jstoday = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    var elapsed = end - start;
    this.firebasedb.collection('Users').doc(userID).collection('Periods').add({
      start: start,
      end: end,
      elapsed: elapsed
    })
  }

  saveTask(userID: any, description: any, duration: any): any {
    this.firebasedb.collection('Users').doc(userID).collection('Tasks').add({
      date: new Date(),
      description: description,
      duration: duration      
    })
  }

  getTasks(userID: any): any {
    return this.firebasedb.collection('Users').doc(userID).collection('Tasks').snapshotChanges();
  }

  getPeriods(userID: any): any {
    return this.firebasedb.collection('Users').doc(userID).collection('Periods').snapshotChanges();
  }
}
