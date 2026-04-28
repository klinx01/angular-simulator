import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara'
import Nora from '@primeuix/themes/nora'

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

  selectTheme(theme: string): void {
    switch (theme) {
      case 'Aura':
        usePreset(Aura);
        this.localStorageService.setValue('themeStyle', theme);
        break;
      case 'Lara':
        usePreset(Lara);
        this.localStorageService.setValue('themeStyle', theme);
        break;
      case 'Nora':
        usePreset(Nora);
        this.localStorageService.setValue('themeStyle', theme);
        break;
    }
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