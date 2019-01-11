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
    var elapsed = end - start + 14400000;
    var elapsedTime = new Date(elapsed);
    this.firebasedb.collection('Users').doc(userID).collection('Periods').add({
      start: start,
      end: end,
      elapsed: elapsedTime
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
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.firebasedb.collection('Users').doc(userID).collection('Tasks', ref => {
      return ref
        .where('date', '>', today)
        .orderBy('date', 'asc');
    }).snapshotChanges();
  }

  getPeriods(userID: any): any {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.firebasedb.collection('Users').doc(userID).collection('Periods', ref => {
      return ref
        .where('start', '>', today)
        .orderBy('start', 'asc');
    }).snapshotChanges();
  }
}
