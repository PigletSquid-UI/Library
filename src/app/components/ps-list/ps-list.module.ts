import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsListComponent } from './ps-list.component';

@NgModule({
    declarations: [PsListComponent],
    imports: [
        CommonModule
    ],
    exports: [PsListComponent]
})
export class PsListModule { }
