import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
