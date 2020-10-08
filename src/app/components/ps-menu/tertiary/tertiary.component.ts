import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PsMenuService } from '../ps-menu.service';

@Component({
    selector: 'mt',
    templateUrl: './tertiary.component.html',
    styleUrls: ['./tertiary.component.scss']
})
export class TertiaryComponent implements OnInit {

    @Input() title: string = "";
    @Input() icon:string;

    @ViewChild('item')
    itemRef;

    constructor(
        private menu: PsMenuService,
    ) { }

    ngOnInit(): void {
    }

    itemClick(){
        this.menu.updateActiveItem(this.itemRef.nativeElement as HTMLElement);
    }

}
