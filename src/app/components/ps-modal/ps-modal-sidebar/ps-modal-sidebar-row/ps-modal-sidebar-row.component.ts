import { Component, OnInit, Input } from '@angular/core';
import { PsModalService } from '../../ps-modal.service';

@Component({
    selector: 'ps-modal-sidebar-row',
    templateUrl: './ps-modal-sidebar-row.component.html',
    styleUrls: ['./ps-modal-sidebar-row.component.scss']
})
export class PsModalSidebarRowComponent implements OnInit {

    @Input() modalList:any[] = [];

    constructor(
        private modalService: PsModalService
    ) { }

    ngOnInit(): void {

    }

    recoverModal(id:string,index:number){
        this.modalList.splice(index,1);
        this.modalService.recover(id);
    }

}
