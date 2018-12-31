import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router"
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from '../users/users.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  isLogged: boolean;
  validData: boolean = true;
  error: string;

  constructor(private firebasedb: AngularFireAuth, private router: Router, private usersService: UsersService) {
    this.firebasedb.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.isLogged = true;
        this.router.navigate(['/home']);
      }
      else {
        this.isLogged = false;
        console.log('no logged in');
      }
    })
  }

  ngOnInit() {
  }

  login() {
    const promise = this.firebasedb.auth.signInWithEmailAndPassword(this.email, this.password);
    promise.catch(e => {
      console.log(e.message)
      this.validData = false;
      this.error = e.message;
    });
    //promise.then(); 
  }

  signup() {
    const promise = this.firebasedb.auth.createUserWithEmailAndPassword(this.email, this.password);
    promise.then(e => {
        this.usersService.saveUser(this.firebasedb.auth.currentUser.uid, this.email);
      }
    );
    promise.catch(e => console.log(e.message));
  }

  logout() {
    const promise = this.firebasedb.auth.signOut();
    promise.catch(e => console.log(e.message));
  }
}

export class InputErrorStateMatcherExample {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}