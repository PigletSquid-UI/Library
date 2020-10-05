import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsButtonComponent } from './ps-button/ps-button.component';
import { PsCbuttonComponent } from './ps-cbutton/ps-cbutton.component';

@NgModule({
  declarations: [
    PsButtonComponent,
    PsCbuttonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PsButtonComponent
  ]
  
})
export class PsButtonModule { }
