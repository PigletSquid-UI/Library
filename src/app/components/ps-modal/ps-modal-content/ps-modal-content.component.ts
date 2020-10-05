import { Component, Input, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentFactory, Injector, ElementRef } from '@angular/core';

@Component({
    selector: 'ps-modal-content',
    templateUrl: './ps-modal-content.component.html',
    styleUrls: ['./ps-modal-content.component.scss']
})
export class PsModalContentComponent implements OnInit,AfterViewInit {

    @Input() content: any;

    @ViewChild('contentContainer')
    contentContainer: ElementRef;

    comFactory:ComponentFactory<any>;

    constructor(
        private comFactoryResolver:ComponentFactoryResolver,
        private injector: Injector,
    ) { }

    ngOnInit(): void {
        this.comFactory = this.comFactoryResolver.resolveComponentFactory(this.content);
    }

    ngAfterViewInit(){
        this.comFactory.create(this.injector,[],this.contentContainer.nativeElement);
    }



}
