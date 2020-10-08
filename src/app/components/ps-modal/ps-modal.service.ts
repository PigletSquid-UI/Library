import { Injectable, ComponentFactoryResolver, ComponentFactory, RendererFactory2, Renderer2, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { PsModalSidebarColumnComponent } from './ps-modal-sidebar/ps-modal-sidebar-column/ps-modal-sidebar-column.component';
import { PsModalSidebarRowComponent } from './ps-modal-sidebar/ps-modal-sidebar-row/ps-modal-sidebar-row.component';
import { PsModalComponent } from './ps-modal.component';
import { PsModalOptions } from './ps-modal.class';
import { Subject, timer } from 'rxjs';

declare class positionValue{
    top?:string;
    left?: string;
    right?:string;
    bottom?:string;
}

@Injectable({
    providedIn: 'root'
})
export class PsModalService {

    modalFactory: ComponentFactory<any>;
    sidebarFactory: ComponentFactory<any>;

    modalContainer: HTMLElement;//modalContainer
    root: any;
    renderer: Renderer2;
    ifInit: boolean = false;

    ifSidebar: boolean = false;
    sidebarContainer: HTMLElement;
    sidebar:any;
    modalList: any[] = [];

    private position: string = "right";

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private RendererFactory2: RendererFactory2,
        private injector: Injector,
        private appRef: ApplicationRef
    ) {
        this.renderer = this.RendererFactory2.createRenderer("", null);
        this.modalFactory = this.componentFactoryResolver.resolveComponentFactory(PsModalComponent);
       
    }

    create(options: PsModalOptions, single: boolean = true) {
        let subject = new Subject<string>();
        if (!single) {
            let container = this.initModalContainer(true);
            //多窗口模式
            let ref = this.modalFactory.create(this.injector, [], container);
            console.log(ref.instance);
            this.appRef.attachView(ref.hostView);
            this.initModal(ref, options);
            timer(0).subscribe(() => {
                this.updateModalList(ref, single, subject);
            })
        } else {
            //单窗口模式
            let container = this.initModalContainer(false);
            let ref = this.modalFactory.create(this.injector, [], container);
            console.log(ref.instance);
            this.appRef.attachView(ref.hostView);
            this.initModal(ref, options);
            timer(0).subscribe(() => {
                this.updateModalList(ref, single, subject);
            })
        }
        return subject;
    }

    addModalList(title:string,id:string){
        console.log(`title:${title},id:${id}`);
        this.sidebar.instance.modalList.push({
            title,
            id
        });
    }

    destory() {

    }

    recover(id:string){
        for (let i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].id == id) {
                this.renderer.setStyle(this.modalList[i].container, "display", "block");
                this.modalList[i].subject.next("recover");
                return;
            }
        }
    }

    minimize(id: string) {
        //Do the minimize operation must init the sidebar before.
        if (!this.ifSidebar || this.sidebarContainer == null || this.sidebarContainer == undefined) {
            throw new Error("Want the minimize function effective must init the sidebar before.");
        }
        for (let i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].id == id) {
                this.renderer.setStyle(this.modalList[i].container, "display", "none");
                this.modalList[i].subject.next("mini");
                this.addModalList(this.modalList[i].title,this.modalList[i].id);
                return;
            }
        }
    }

    maximize(id: string) {
        for (let i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].id == id) {
                this.renderer.setStyle(this.modalList[i].container, "width", "100%");
                this.renderer.setStyle(this.modalList[i].container, "height", "100%");
                this.modalList[i].subject.next("max");
                return;
            }
        }
    }

    close(id: string) {
        for (let i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].id == id) {
                if (this.modalList[i].single) {
                    this.ifInit = false;
                    this.modalContainer = undefined;
                }
                this.renderer.removeChild(this.root, this.modalList[i].container);
                this.modalList[i].subject.next("close");
                this.modalList.splice(i, 1);
                return;
            }
        }
    }

    ok(id: string) {
        for (let i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].id == id) {
                if (this.modalList[i].single) {
                    this.ifInit = false;
                    this.modalContainer = undefined;
                }
                this.renderer.removeChild(this.root, this.modalList[i].container);
                this.modalList[i].subject.next("ok");
                this.modalList.splice(i, 1);
                return;
            }
        }
    }

    cancel(id: string) {
        for (let i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].id == id) {
                if (this.modalList[i].single) {
                    this.ifInit = false;
                    this.modalContainer = undefined;
                }
                this.renderer.removeChild(this.root, this.modalList[i].container);
                this.modalList[i].subject.next("cancel");
                this.modalList.splice(i, 1);
                return;
            }
        }
    }

    initSidebarContainer(position:positionValue,direction:string):void {
        if(this.ifSidebar){
            return;
        }
        const root = document.getElementsByTagName("app-root")[0];
        this.root = root;
        let container = this.renderer.createElement("div");
        this.renderer.setStyle(container, "position", "absolute");
        if(this.checkPositionValue(position)){
            for(let pos in position){
                this.renderer.setStyle(container,pos,position[pos]);
            }
        }
        //不同方向不同布局
        if(direction === "row"){
            //行布局
            this.sidebarFactory = this.componentFactoryResolver.resolveComponentFactory(PsModalSidebarRowComponent);
        }else if(direction === "column"){
            //列布局
            this.sidebarFactory = this.componentFactoryResolver.resolveComponentFactory(PsModalSidebarColumnComponent);
        }else{
            throw new Error("The definition of variable direction is incorrect. The direction should take between 'row' and 'column'.");
        }
        this.sidebarContainer = container;
        this.renderer.appendChild(root,container);
        let ref = this.sidebarFactory.create(this.injector,[],container);
        this.sidebar = ref;
        this.appRef.attachView(ref.hostView);
        this.ifSidebar = true;
    }

    checkPositionValue(position:positionValue):boolean{
        if(Object.getOwnPropertyNames(position).length != 2){
            throw new Error("The definition of variable position is incorrect. The position can only have two properties, one should between 'top' and 'bottom',and the other should between 'left' and 'right'.")
        }
        if((position.top == undefined && position.bottom != undefined) || (position.top != undefined && position.bottom == undefined)){
            return true;
        }
        return false;
    }

    initModalContainer(infinite: boolean) {
        const root = document.getElementsByTagName("app-root")[0];
        this.root = root;
        if (infinite) {
            //多窗口模式
            let container = this.renderer.createElement("div");
            this.renderer.addClass(container, "ps-modal-container");
            this.renderer.setStyle(container, "position", "absolute");
            this.renderer.setStyle(container, "top", "50%");
            this.renderer.setStyle(container, "left", "50%");
            this.renderer.setStyle(container, "transform", "translate(-50%, -50%)");
            this.renderer.appendChild(root, container);
            return container;
        } else {
            //单窗口模式
            if (!this.ifInit || this.modalContainer == null || this.modalContainer == undefined) {
                //第一个单窗口尚未初始化
                let container = this.renderer.createElement("div");
                this.renderer.addClass(container, "ps-modal-container");
                this.renderer.setStyle(container, "position", "absolute");
                this.renderer.setStyle(container, "top", "50%");
                this.renderer.setStyle(container, "left", "50%");
                this.renderer.setStyle(container, "transform", "translate(-50%, -50%)");
                this.renderer.appendChild(root, container);
                this.modalContainer = container;
                this.ifInit = true;
                return container;
            } else {
                return this.modalContainer;
            }
        }
    }

    initModal(ref: ComponentRef<any>, options: PsModalOptions) {
        for (let option in options) {
            ref.instance[option] = options[option];
        };
    }

    updateModalList(ref: ComponentRef<any>, single: boolean, subject: Subject<string>) {
        let id = new Date().getTime().toString();
        ref.instance.id = id;
        this.modalList.push({
            id,
            title: ref.instance.title,
            modal: ref.instance.modal,
            container: ref.instance.modal.parentElement,
            index: this.modalList.length,
            single,
            subject
        })
        return this.modalList;
    }

}
