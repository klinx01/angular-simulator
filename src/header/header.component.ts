import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { ToggleSwitchModule, ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../theme.service';
import { AsyncPipe } from '@angular/common';
import { Theme } from '../enums/Theme';
import { SelectButtonModule, SelectButton } from 'primeng/selectbutton';
import { IThemeOption } from '../interfaces/IThemeOption';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive, ToggleSwitch, AsyncPipe, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  companyName: string = 'румтибет';
  currentFunctionality: string = 'timer';
  counter: number = 0;
  currentDate!: string;
  selectedTheme!: Theme;
  
  themeOptions: IThemeOption[] = [
    { name: 'Lara', value: Theme.LARA },
    { name: 'Aura', value: Theme.AURA },
    { name: 'Nora', value: Theme.NORA }
  ];

  navigations: INavigation[] = [
    { id: 'home-page', name: 'Главная', path: '/' },
    { id: 'users', name: 'Пользователи', path: '/users' }
  ];
  
  constructor() {
    const savedTheme: Theme | null = this.localStorageService.getValue<Theme>('themeStyle');
    this.selectedTheme = savedTheme ?? Theme.AURA;

    setTimeout(() => {
      this.updateCurrentTime();
    }, 0);
    
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

  }

  onThemeChange(theme: Theme): void {
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
