import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara'
import Nora from '@primeuix/themes/nora'
import { routes } from './app.routes';
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { LaraBaseDesignTokens } from '@primeuix/themes/lara/base';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptors/logging.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { authInterceptor } from '../feature/auth/interceptors/auth.interceptor';
import { Observable, tap, of } from 'rxjs';
import { AuthService } from '../feature/auth/services/auth.service';

function getSavedTheme(): Preset<AuraBaseDesignTokens> | Preset<LaraBaseDesignTokens> {
  const savedTheme: string | null = localStorage.getItem('themeStyle');

  if (!savedTheme) {
    return Aura;
  }
  
  const theme: Theme = JSON.parse(savedTheme);
  switch (theme) {
    case Theme.LARA:
      return Lara;
    case Theme.NORA:
      return Nora;
    default:
      return Aura;
  }
}

  export function initAuth(authService: AuthService) {
    return () => authService.checkAuthStatus();
  }

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true
    },
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])),
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