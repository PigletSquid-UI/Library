import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ps-modal-footer',
    templateUrl: './ps-modal-footer.component.html',
    styleUrls: ['./ps-modal-footer.component.scss']
})
export class PsModalFooterComponent implements OnInit {

    @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    cancel(){
        this.clickEvent.emit("cancel");
    }

    ok(){
        this.clickEvent.emit("ok");
    }

}
