import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatTabsModule, MatOptionModule, MatSelectModule, MatTableModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './tasks/tasks.component';
import { PeriodsComponent } from './periods/periods.component';
import { HistoryComponent } from './history/history.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home',      component: HomeComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    HomeComponent,
    TasksComponent,
    PeriodsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatIconModule, MatTabsModule, MatOptionModule, MatSelectModule, MatTableModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
