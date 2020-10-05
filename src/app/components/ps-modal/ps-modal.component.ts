import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit, ComponentFactory, ViewContainerRef} from '@angular/core';
import { PsModalService } from './ps-modal.service';

@Component({
    selector: 'ps-modal',
    templateUrl: './ps-modal.component.html',
    styleUrls: ['./ps-modal.component.scss']
})
export class PsModalComponent implements OnInit,AfterViewInit {
    @Input() id:string;
    @Input() title: string = '新窗口';
    @Input() content: any;
    @Input() width: string = '400px';
    @Input() mini: boolean = true;
    @Input() max: boolean = true;
    @Input() drag: boolean = false;
    @Input() footer: boolean = true;

    @ViewChild('modal') 
    modalRef: ElementRef;

    @ViewChild('modalContent',{read: ViewContainerRef}) 

    contentRef: ViewContainerRef;
    comFactory:ComponentFactory<any>;
    modal:HTMLElement;

    constructor(
        private renderer:Renderer2,
        private modalService:PsModalService
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(){
        this.modal = this.modalRef.nativeElement;
        this.renderer.setStyle(this.modal,"width",this.width);
    }

    click(event:string){
        switch(event){
            case "close":
                this.close(this.id);
                break;
            case "mini":
                this.minimize(this.id);
                break;
            case "max":
                this.maximize(this.id);
                break;
            case "ok":
                this.ok(this.id);
                break;
            case "cancel":
                this.cancel(this.id);
                break;
            default:
                throw new Error("The state of modal is wrong");
        }
    }

    close(id:string){
        this.modalService.close(id);
    }

    minimize(id:string){
        this.modalService.minimize(id);
    }

    maximize(id:string){
        this.modalService.maximize(id);
    }

    ok(id:string){
        this.modalService.ok(id);
    }

    cancel(id:string){
        this.modalService.cancel(id);
    }



}
