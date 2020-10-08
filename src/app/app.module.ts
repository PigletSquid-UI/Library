import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PsInputModule } from './components/ps-input/ps-input.module';
import { PsButtonModule } from './components/ps-button/ps-button.module';
import { PsCalendarModule } from './components/ps-calendar/ps-calendar.module';
import { PsModalModule } from './components/ps-modal/ps-modal.module';
import { PsRotationModule } from './components/ps-rotation/ps-rotation.module';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    PsInputModule, 
    PsButtonModule,
    PsCalendarModule,
    PsModalModule,
    PsRotationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
