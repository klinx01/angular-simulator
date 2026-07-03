import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[gradientBorderDirective]',
})
export class GradientBorderDirective {
  @Input() gradientConfiguration: IGradientConfiguration = {};

  private timeoutId!: number;

  @HostListener('mouseenter')
  onHover(): void {
    this.timeoutId = setTimeout(() => {
      this.isActiveClass = true;
    }, this.gradientConfiguration.delay ?? 1000);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    clearTimeout(this.timeoutId);
    this.isActiveClass = false;
  }

  @HostBinding('class.animated-border')
  isActiveClass = false;

  @HostBinding('style.--gradient-colors')
  get gradientColors(): string {
    return this.gradientConfiguration.colors?.join() ?? 'red, blue, yellow';
  }

  @HostBinding('style.--gradient-thickness')
  get gradientThickness(): string {
    return this.gradientConfiguration.thickness ?? '2px';
  }
}
