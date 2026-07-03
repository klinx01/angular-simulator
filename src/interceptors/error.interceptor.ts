import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500 && error.status <= 599) {
        messageService.showError(`Ошибка! ${error.status}`);
      }

      switch (error.status) {
        case 400:
          messageService.showError('Ошибка: Неверно заполнены поля формы');
          break;
        case 404:
          messageService.showError('Ошибка: Данные не найдены');
          break;
        default:
          messageService.showError('Произошла непредвиденная ошибка');
          break;
      }
      return throwError(() => error);
    }),
  );
};
