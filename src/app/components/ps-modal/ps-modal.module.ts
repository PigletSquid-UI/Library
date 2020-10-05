import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsModalComponent } from './ps-modal.component';
import { PsModalHeaderComponent } from './ps-modal-header/ps-modal-header.component';
import { PsModalFooterComponent } from './ps-modal-footer/ps-modal-footer.component';
import { PsModalContentComponent } from './ps-modal-content/ps-modal-content.component';

import { PsButtonModule } from '../ps-button/ps-button.module';



@NgModule({
    declarations: [
        PsModalComponent,
        PsModalHeaderComponent,
        PsModalFooterComponent,
        PsModalContentComponent
    ],
    imports: [
        CommonModule,
        PsButtonModule
    ],
    exports: [PsModalComponent],
})
export class PsModalModule { }
