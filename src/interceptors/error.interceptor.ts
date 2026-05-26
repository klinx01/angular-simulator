import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService)
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
          if (error.status === 500 || error.status === 502 || error.status === 504 || error.status === 503) {
            messageService.showError(`Ошибка! ${ error.status }`);
          }
          return throwError(() => error);
        })
  );
};

