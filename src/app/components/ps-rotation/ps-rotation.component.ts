import { interval, Observable, Subscription, timer } from 'rxjs';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'ps-rotation',
    templateUrl: './ps-rotation.component.html',
    styleUrls: ['./ps-rotation.component.scss']
})
export class PsRotationComponent implements OnInit {

    @Input() source: any[] = [];
    @Input() gap: number = 2000;//ms

    index: number = 0;

    intervalTime:number = 0;

    constructor(
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        this.main();
    }

    previous(){
        if(this.index != 0){
            this.index--;
        }else{
            this.index = this.source.length - 1;
        }
        this.intervalTime = 0;
    }

    next(){
        if(this.index != this.source.length - 1){
            this.index++;
        }else{
            this.index = 0;
        }
        this.intervalTime = 0;
    }

    main(){
        let steps = this.gap / 100;
        interval(100).subscribe(res => {
            this.intervalTime += 1;
            if(this.intervalTime == (steps - 1)){
                this.next();
            }
        })
    }

    startTimer(){
        return timer(2000);
    }





}