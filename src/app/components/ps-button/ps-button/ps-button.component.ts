import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { Observable, timer } from 'rxjs';

@Component({
    selector: 'ps-button',
    template: `
    <div class="ps-button" 
    [ngClass]="{
        'ps-button-small' : buttonSize === 'small',
        'ps-button-medium' : buttonSize === 'medium' || buttonSize === 'default',
        'ps-button-large' : buttonSize === 'large',
        'ps-button-round' : buttonType === 'round' || buttonType === 'dafault',
        'ps-button-square' : buttonType === 'square',
        'ps-button-basic' : buttonKind === 'basic',
        'ps-button-simple' : buttonKind === 'simple',
        'ps-button-primary' : buttonKind === 'primary' || buttonType === 'default',
        'ps-button-success' : buttonKind === 'success',
        'ps-button-warning' : buttonKind === 'warning',
        'ps-button-danger' : buttonKind === 'danger'
    }"
    (click)="click()" [title]="title" #psButton>
        {{buttonText}}
    </div>
    `,
    styleUrls: ['./ps-button.component.scss'],
    host: {
    }
})
export class PsButtonComponent implements OnInit {
    @Input() buttonText: string = '按钮';//按钮文本
    @Input() buttonSize: string = 'medium';//按钮大小
    @Input() buttonType: string = 'round';//按钮类型
    @Input() buttonKind: string = 'primary';//按钮类型
    @Input() throttle: string;//防抖周期（ms），默认不开启
    @Output() buttonClick = new EventEmitter<boolean>();

    @ViewChild('psButton',{ static:true }) button: ElementRef;

    available:boolean = true;
    @Input() title:string;

    constructor() { }

    ngOnInit(): void {
        this.checkButtonType(this.buttonType);
        this.checkButtonSize(this.buttonSize);
        this.checkButtonKind(this.buttonKind);
        this.title = this.initButtonTitle(this.buttonKind,this.title);
    }

    /**
     * Init the timer for throttle click
     * @param {number} throttle
     * @returns
     * @memberof PsButtonComponent
     */
    initThrottle(throttle:string): Observable<number>{
        if(!throttle || throttle === null || throttle === undefined){
            return;
        }
        let gap = parseInt(throttle);
        if(isNaN(gap)){
            throw Error("The value of button throttle is incorrect.");
        }
        return timer(gap);
    }

    /**
     * Emit click event by EventEmitter
     * @memberof PsButtonComponent
     */
    click(){
        //If use throttle click
        if(!this.throttle || this.throttle === null || this.throttle === undefined){
            //No use
            this.buttonClick.emit(true);
        }else{
            //Use
            if(this.available){
                this.buttonClick.emit(true);
                this.available = false;
                const TIMER = this.initThrottle(this.throttle);
                TIMER.subscribe(res => {
                    this.available = true;
                })
            }
        }
    }

    checkThrottle(throttle:string){
        if(!throttle || throttle === null || throttle === undefined){
            return true;
        }
        if(isNaN(parseInt(throttle))){
            throw Error("The value of button throttle is incorrect.");
        }
    }

    checkButtonSize(buttonSize:string){
        switch(buttonSize){
            case 'round':
            case 'medium':
            case 'large':
            case 'default':
                return true;
            default:
                throw Error("The value of buttonSize is incorrect.")
        }
    }

    checkButtonType(buttonType:string){
        switch(buttonType){
            case 'round':
            case 'square':
            case 'default':
                return true;
            default:
                throw Error("The value of buttonType is incorrect.")
        }
    }

    checkButtonKind(buttonKind:string){
        switch(buttonKind){
            case 'basic':
            case 'simple':
            case 'primary':
            case 'success':
            case 'warning':
            case 'danger':
            case 'default':
                return true;
            default:
                throw Error("The value of buttonType is incorrect.")
        }
    }

    initButtonTitle(buttonKind:string,title:string):string{
        if(typeof title === 'string'){
            return title;
        }
        if(buttonKind === 'warning' || buttonKind === 'danger'){
            return "请谨慎操作！";
        }
        return "";
    }
}
