import { Injectable, ComponentFactoryResolver, ComponentFactory, RendererFactory2, Renderer2, ApplicationRef, Injector, ComponentRef} from '@angular/core';
import { PsModalComponent } from './ps-modal.component';
import { PsModalOptions } from './ps-modal.class';
import { Subject, timer } from 'rxjs'; 


@Injectable({
    providedIn: 'root'
})
export class PsModalService {

    ComponentFactory:ComponentFactory<any>;
    container:HTMLElement;
    root:any;
    renderer:Renderer2;
    ifInit:boolean = false;

    modalList:any[] = [];

    constructor(
        private ComFactoryResolver: ComponentFactoryResolver,
        private RendererFactory2: RendererFactory2,
        private injector: Injector,
        private appRef: ApplicationRef
    ) { 
        this.renderer = this.RendererFactory2.createRenderer("",null);
        this.ComponentFactory = this.ComFactoryResolver.resolveComponentFactory(PsModalComponent);
    }

    create(options:PsModalOptions,single:boolean = true){
        let subject = new Subject<string>();
        if(!single){
            let container = this.initContainer(true);
            //多窗口模式
            let ref = this.ComponentFactory.create(this.injector,[],container);
            this.appRef.attachView(ref.hostView);
            this.initModal(ref,options);
            timer(0).subscribe(() => {
                this.updateModalList(ref,single,subject);
            })
        }else{
            //单窗口模式
            let container = this.initContainer(false);
            let ref = this.ComponentFactory.create(this.injector,[],container);
            this.appRef.attachView(ref.hostView);
            this.initModal(ref,options);
            timer(0).subscribe(() => {
                this.updateModalList(ref,single,subject);
            })
        }
        return subject;
    }

    destory(){

    }

    minimize(id:string){
        for(let i = 0;i < this.modalList.length;i++){
            if(this.modalList[i].id == id){
                this.modalList[i].subject.next("mini");
                return;
            }
        }
    }

    maximize(id:string){
        for(let i = 0;i < this.modalList.length;i++){
            if(this.modalList[i].id == id){
                this.modalList[i].subject.next("max");
                return;
            }
        }
    }

    close(id:string){
        for(let i = 0;i < this.modalList.length;i++){
            if(this.modalList[i].id == id){
                if(this.modalList[i].single){
                    this.ifInit = false;
                    this.container = undefined;
                }
                this.renderer.removeChild(this.root,this.modalList[i].dom.parentElement);
                this.modalList[i].subject.next("close");
                this.modalList.splice(i,1);
                return;
            }
        }
    }

    ok(id:string){
        for(let i = 0;i < this.modalList.length;i++){
            if(this.modalList[i].id == id){
                if(this.modalList[i].single){
                    this.ifInit = false;
                    this.container = undefined;
                }
                this.renderer.removeChild(this.root,this.modalList[i].dom.parentElement);
                this.modalList[i].subject.next("ok");
                this.modalList.splice(i,1);
                return;
            }
        }
    }

    cancel(id:string){
        for(let i = 0;i < this.modalList.length;i++){
            if(this.modalList[i].id == id){
                if(this.modalList[i].single){
                    this.ifInit = false;
                    this.container = undefined;
                }
                this.renderer.removeChild(this.root,this.modalList[i].dom.parentElement);
                this.modalList[i].subject.next("cancel");
                this.modalList.splice(i,1);
                return;
            }
        }
    }

    initContainer(infinite:boolean){
        const root = document.getElementsByTagName("app-root")[0];
        this.root = root;
        if(infinite){
            //多窗口模式
            let container = this.renderer.createElement("div");
            this.renderer.addClass(container,"ps-modal-container");
            this.renderer.setStyle(container,"position","absolute");
            this.renderer.setStyle(container,"top","50%");
            this.renderer.setStyle(container,"left","50%");
            this.renderer.setStyle(container,"transform","translate(-50%, -50%)");
            this.renderer.appendChild(root,container);
            return container;
        }else{
            //单窗口模式
            if(!this.ifInit || this.container == null || this.container == undefined){
                //第一个单窗口尚未初始化
                let container = this.renderer.createElement("div");
                this.renderer.addClass(container,"ps-modal-container");
                this.renderer.setStyle(container,"position","absolute");
                this.renderer.setStyle(container,"top","50%");
                this.renderer.setStyle(container,"left","50%");
                this.renderer.setStyle(container,"transform","translate(-50%, -50%)");
                this.renderer.appendChild(root,container);
                this.container = container;
                this.ifInit = true;
                return container;
            }else{
                return this.container;
            }
        }
    }

    initModal(ref:ComponentRef<any>,options:PsModalOptions){
        for(let option in options){
            ref.instance[option] = options[option];
        };
    }

    updateModalList(ref:ComponentRef<any>,single:boolean,subject:Subject<string>){
        let id = new Date().getTime().toString();
        ref.instance.id = id;
        this.modalList.push({
            id,
            dom: ref.instance.modal,
            index: this.modalList.length,
            single,
            subject
        })
        return this.modalList;
    }

}
