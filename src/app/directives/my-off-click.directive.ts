import { EventEmitter, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Output } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[myOffClick]'
})
export class MyOffClickDirective {
  clickCount:number = 0;
  @Output() offClick = new EventEmitter();
  @Input() visibility!: boolean;

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    if(this.clickCount > 0){
      let elementRefInPath = targetElementPath.find(e => e === this._elementRef.nativeElement);
      if (!elementRefInPath) {
        this.offClick.emit(null);
      }
    }
    this.clickCount++;
    console.log('dasd')
  }
}
