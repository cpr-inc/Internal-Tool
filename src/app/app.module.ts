import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { DatePipe } from './shared/pipe/date.pipe';
import { ModalComponent } from './todolist/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    DatePipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
