import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsModalComponent } from './ps-modal.component';
import { PsModalHeaderComponent } from './ps-modal-header/ps-modal-header.component';
import { PsModalFooterComponent } from './ps-modal-footer/ps-modal-footer.component';
import { PsModalContentComponent } from './ps-modal-content/ps-modal-content.component';

import { PsButtonModule } from '../ps-button/ps-button.module';
import { PsModalSidebarRowComponent } from './ps-modal-sidebar/ps-modal-sidebar-row/ps-modal-sidebar-row.component';
import { PsModalSidebarColumnComponent } from './ps-modal-sidebar/ps-modal-sidebar-column/ps-modal-sidebar-column.component';

@NgModule({
    declarations: [
        PsModalComponent,
        PsModalHeaderComponent,
        PsModalFooterComponent,
        PsModalContentComponent,
        PsModalSidebarRowComponent,
        PsModalSidebarColumnComponent,
    ],
    imports: [
        CommonModule,
        PsButtonModule
    ],
    exports: [PsModalComponent],
})
export class PsModalModule { }
