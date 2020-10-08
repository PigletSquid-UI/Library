import { Component, ElementRef, ViewChild, AfterViewInit, ViewRef} from '@angular/core';
import { PsModalService } from './components/ps-modal/ps-modal.service';
import { TestComponent } from './test/test.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{

    @ViewChild('menu')
    menuRef:ElementRef;

    constructor(
        private modal: PsModalService
    ) {

    }
    title = 'PigletSquid';

    rotationSource = ['assets/1.jpg','assets/2.jpg','assets/3.jpg','assets/4.jpg','assets/5.jpg']

    buttonClick() {
        this.modal.initSidebarContainer({
            top:"0",
            left:"0"
        },"row")
        this.modal.create({
            title: "测试标题啊啊啊啊啊啊",
            content: TestComponent,
            //footer:false,
            //max:false
        },false).subscribe(res => {
            switch(res){
                case "close":
                    console.log("close");
                    break;
                case "mini":
                    console.log("mini");
                    break;
                case "max":
                    console.log("max");
                    break;
                case "ok":
                    console.log("ok");
                    break;
                case "cancel":
                    console.log("cancel");
                    break;
                case "recover":
                    console.log("recover");
                    break;
                default:
                    throw new Error("The state of modal is wrong");
            }
        })
    }

    click(){
        console.log("click");
    }

    test2(){
        console.log(this.menuRef);
    }
}
