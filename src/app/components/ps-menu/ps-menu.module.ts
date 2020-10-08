import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsMenuService } from './ps-menu.service';
import { PsMenuComponent } from './ps-menu.component';
import { PrimaryComponent } from './primary/primary.component';
import { SecondaryComponent } from './secondary/secondary.component';
import { TertiaryComponent } from './tertiary/tertiary.component';



@NgModule({
    declarations: [PsMenuComponent, PrimaryComponent, SecondaryComponent, TertiaryComponent],
    imports: [
        CommonModule
    ],
    exports: [PsMenuComponent,PrimaryComponent, SecondaryComponent, TertiaryComponent],
    providers: [PsMenuService]
})
export class PsMenuModule { }
