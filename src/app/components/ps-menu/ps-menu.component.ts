import { Component, ElementRef, Input, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { PsMenuService } from './ps-menu.service';

@Component({
    selector: 'ps-menu',
    templateUrl: './ps-menu.component.html',
    styleUrls: ['./ps-menu.component.scss']
})
export class PsMenuComponent implements OnInit,AfterViewInit {


    @Input() ifClean: boolean = false;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private menu: PsMenuService
    ) { }


    ngAfterViewInit(): void {

    }

    ngOnInit(): void {
        this.menu.setIfClean(this.ifClean);
    }



}
