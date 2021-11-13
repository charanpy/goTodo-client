import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { TodolistComponent } from './components/todolist/todolist.component';
import { AddtodoComponent } from './components/addtodo/addtodo.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent, HomeComponent, TodolistComponent, AddtodoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
