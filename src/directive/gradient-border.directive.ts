import { Directive, ElementRef, HostBinding, HostListener, inject, Input, OnInit } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[GradientConfiguration]',
})
export class GradientBorderDirective implements OnInit {

  @Input() GradientConfiguration!: IGradientConfiguration;

  private isActive: boolean = false;
  private timeoutId!: number;

  private defaultValue: IGradientConfiguration = {
    delay: 1000,
    colors: ['red', 'yellow', 'blue'],
    thickness: '2px',
  };

  ngOnInit(): void {
    this.defaultValue = {
      ...this.defaultValue, ...this.GradientConfiguration
    }
  }

  @HostListener('mouseenter')
  onHover(): void {
   this.timeoutId = setTimeout(() => {
      this.isActive = true;
    }, this.defaultValue.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    clearTimeout(this.timeoutId);
    this.isActive = false;
  }

  @HostBinding('style.border')
  get border(): string {
    return `${this.defaultValue.thickness} solid transparent`;
  }

  @HostBinding('style.borderImage')
  get borderImage(): string {
    if (!this.isActive) { 
      return 'none';
    }
    return `linear-gradient(45deg, ${this.defaultValue.colors}) 1`;
  }
}

