import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { ToggleSwitchModule, ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../theme.service';
import { AsyncPipe } from '@angular/common';
import { SelectButtonModule, SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive, ToggleSwitch, AsyncPipe, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService = inject(ThemeService)
  companyName: string = 'румтибет';
  currentFunctionality: string = 'timer';
  counter: number = 0;
  currentDate!: string;
  selectedTheme!: string
  
  themeOptions = [
    { name: 'Lara', value: 'Lara' },
    { name: 'Aura', value: 'Aura' },
    { name: 'Nora', value: 'Nora' }
  ];

  navigations: INavigation[] = [
    { id: 'home-page', name: 'Главная', path: '/' },
    { id: 'users', name: 'Пользователи', path: '/users' }
  ];
  
  constructor() {
    setTimeout(() => {
      this.updateCurrentTime();
    }, 0);
    
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  onThemeChange(theme: string): void {
    this.themeService.selectTheme(theme);
  }

  increaseCounter(): void {
    this.counter += 1;
  }

  decreaseCounter(): void {
    this.counter -= 1;
  }

  showClicker(): void {
    this.currentFunctionality = 'clicker';
  }

  private updateCurrentTime(): void {
    this.currentDate = new Date().toLocaleString();
  }

  showDate(): void {
    this.currentFunctionality = 'timer';
  }

}
