import { Component } from '@angular/core';
import { PsModalService } from './components/ps-modal/ps-modal.service';
import { TestComponent } from './test/test.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private modal: PsModalService
    ) {

    }
    title = 'PigletSquid';

    buttonClick() {
        this.modal.create({
            title: "测试标题",
            content: TestComponent,
            //footer:false,
            //max:false
        }).subscribe(res => {
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
                default:
                    throw new Error("The state of modal is wrong");
            }
        })
    }
}
