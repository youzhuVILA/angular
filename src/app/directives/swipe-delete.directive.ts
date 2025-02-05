import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Directive({
  selector: '[swipeDelete]'
})
export class SwipeDeleteDirective {
  @Output() delete = new EventEmitter<void>();
  private startX = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;
    
    if (deltaX > 100) {
      event.preventDefault();
      this.delete.emit();
    }
  }
} 