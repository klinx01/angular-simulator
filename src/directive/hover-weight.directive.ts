import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverWeight]',
})
export class HoverWeightDirective {

  @HostBinding('style.fontWeight') fontWeight = 'normal';

  @HostListener('mouseenter')
  onHover(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeight = 'normal';
  }

}
