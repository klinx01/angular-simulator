import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../services/theme.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Theme } from '../enums/Theme';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../feature/auth/services/auth.service';
import { APP_CONFIG } from '../app/tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';
@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive, ToggleSwitch, AsyncPipe, SelectButtonModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  authService: AuthService = inject(AuthService);
  appConfig: IAppConfig = inject(APP_CONFIG);

  companyName = this.appConfig.companyName;
  currentFunctionality = 'timer';
  counter = 0;
  currentDate!: string;
  selectedTheme!: Theme;
  lastVisit: string | null = this.localStorageService.getValue('last-visit');

  navigations: INavigation[] = [
    { id: 'home-page', name: 'Главная', path: '/' },
    { id: 'users', name: 'Пользователи', path: '/users' },
    { id: 'posts', name: 'Список постов', path: '/posts' },
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
    this.currentDate = new Date().toISOString();
  }

  showDate(): void {
    this.currentFunctionality = 'timer';
  }

}
