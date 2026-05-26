import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, finalize, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const start: number = performance.now();
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        console.log('Статус:', event.status);
      }}),
    catchError((error: HttpErrorResponse) => {
      console.log('Статус ошибки:', error.status);
      return throwError(() => error);
    }),
    finalize(() => {
      const end: number = performance.now();
      const durationRequest: number = end - start;
      console.log('req', req.method, req.url, durationRequest)
    } )
  );
};
