import { Component, Input, OnInit, ViewChild, AfterViewInit ,ElementRef} from '@angular/core';
import { PsMenuService } from '../ps-menu.service';

@Component({
    selector: 'ms',
    templateUrl: './secondary.component.html',
    styleUrls: ['./secondary.component.scss']
})
export class SecondaryComponent implements OnInit, AfterViewInit {

    @Input() title: string = "";
    @Input() icon:string;

    @ViewChild('children')
    childrenRef:ElementRef;

    @ViewChild('item')
    itemRef:ElementRef;

    hasChild:boolean = true;
    ifHidden:boolean = true;
    state:number = -1;//'-1' means unfold, '1' means fold, '0' means has none child.


    constructor(
        private menu: PsMenuService,
    ) { }

    ngOnInit(): void {

    }

    itemClick(state:number){
        if(state == 0){
            //None child item
            this.menu.updateActiveItem(this.itemRef.nativeElement as HTMLElement);
        }else{
            this.ifHidden = !this.ifHidden;
            this.state = 0 - this.state;
        }
    }

    initState(){
        if(this.childrenRef.nativeElement.childNodes.length == 0 || this.childrenRef.nativeElement.children.length == 0){
            this.state = 0;
            this.hasChild = false;
        } 
    }

    ngAfterViewInit(){
        this.initState();
    }

}
