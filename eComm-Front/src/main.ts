import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // This already includes CommonModule
import { HeaderComponent } from './app/header/header.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
