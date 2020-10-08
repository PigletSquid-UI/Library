import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PsMenuService {

	private ifClean:boolean;

	renderer: Renderer2;

	primarySubject: Subject<HTMLElement> = new Subject<HTMLElement>();

	activePrimary:HTMLElement;
	actvieItem:HTMLElement;

	constructor(
		private RendererFactory2: RendererFactory2,
	) { 
		this.renderer = this.RendererFactory2.createRenderer("", null);
	}



	updateActiveItem(activeItem:HTMLElement){
		let lastItem = document.getElementsByClassName("ps-menu-active-item")[0];
		if(lastItem != undefined){
			this.renderer.removeClass(lastItem,"ps-menu-active-item");
		}
		this.actvieItem = activeItem;
		this.renderer.addClass(activeItem,"ps-menu-active-item");
	}

	updateActivePrimary(activePrimary:HTMLElement){
		if(!this.ifClean){
			return;
		}
		this.activePrimary = activePrimary;
		this.primarySubject.next(activePrimary);
	}

	getprimarySubject(){
		return this.primarySubject;
	}

	setIfClean(ifClean:boolean){
		this.ifClean = ifClean;
	}

	getIfClean(){
		return this.ifClean;
	}



}
