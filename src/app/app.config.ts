import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara'
import Nora from '@primeuix/themes/nora'
import { routes } from './app.routes';

function getSavedTheme() {
  const savedTheme: string | null = localStorage.getItem('themeStyle');

  if (!savedTheme) {
    return Aura;
  }
  
  const theme: string = JSON.parse(savedTheme);
  switch (theme) {
    case 'Lara':
      return Lara;
    case 'Nora':
      return Nora;
    default:
      return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getSavedTheme(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};