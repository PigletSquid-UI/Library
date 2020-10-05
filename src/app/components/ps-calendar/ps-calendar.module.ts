import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsCalendarComponent } from './ps-calendar.component';



@NgModule({
  declarations: [
    PsCalendarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PsCalendarComponent
  ]
})
export class PsCalendarModule { }
