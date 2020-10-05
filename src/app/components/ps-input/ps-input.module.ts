import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsInputComponent } from './ps-input.component';

@NgModule({
    declarations: [
        PsInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        PsInputComponent
    ],
})
export class PsInputModule{ }