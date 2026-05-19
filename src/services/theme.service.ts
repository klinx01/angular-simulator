import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import { Theme } from '../enums/Theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara'
import Nora from '@primeuix/themes/nora'
import { IThemeOption } from '../interfaces/IThemeOption';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDark$: Observable<boolean> = this.isDarkSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme: boolean | null = this.localStorageService.getValue<boolean>('theme');
    this.isDarkSubject.next(savedTheme ?? false);
    this.applyTheme();
  }

  themeOptions: IThemeOption[] = [
      { name: 'Lara', value: Theme.LARA },
      { name: 'Aura', value: Theme.AURA },
      { name: 'Nora', value: Theme.NORA }
    ];

  selectTheme(theme: Theme): void {
    switch (theme) {
      case Theme.AURA:
        usePreset(Aura);
        break;
      case Theme.LARA:
        usePreset(Lara);
        break;
      case Theme.NORA:
        usePreset(Nora);
        break;
    }

    this.localStorageService.setValue('themeStyle', theme);
  }

  toggleDarkMode(): void {
    this.isDarkSubject.next(!this.isDarkSubject.value);
    this.localStorageService.setValue('theme', this.isDarkSubject.getValue());
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkSubject.getValue()) {
      document.documentElement.classList.add('my-app-dark');
    } else {
      document.documentElement.classList.remove('my-app-dark');
    }
  }

}