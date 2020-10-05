import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ps-modal-header',
    templateUrl: './ps-modal-header.component.html',
    styleUrls: ['./ps-modal-header.component.scss']
})
export class PsModalHeaderComponent implements OnInit {
    @Input() title: string;
    @Input() mini: boolean;
    @Input() max: boolean;
    @Output() clickEvent:EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {

    }

    close(){
        this.clickEvent.emit("close");
    }

    minimize(){
        this.clickEvent.emit("mini");
    }

    maximize(){
        this.clickEvent.emit("max");
    }
}