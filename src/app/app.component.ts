import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { LocalStorageService } from '../local-storage.service';
import { filter, interval, map, Observable, of, skip, Subscriber, take } from 'rxjs';
import { validate } from '@angular/forms/signals';
import { LoaderComponent } from "../loader-component/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageComponent, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  private saveLastVisit(): void {
    const nowDate: string = new Date().toISOString();
    this.localStorageService.setValue('last-visit', nowDate);
  }

  private saveVisitCount(): void {
    const visit: unknown = this.localStorageService.getValue('visits');
    const currentVisit: number = visit ? Number(visit) : 0;
    this.localStorageService.setValue('visits', currentVisit + 1);
  }

}

const observable$: Observable<string> = new Observable<string>((sub: Subscriber<string>) => {
  sub.next('Hello');
  sub.next('RxJs');
  sub.complete();
});

observable$.subscribe({
  next: (value: string) => console.log(value),
  complete: () => console.log('Completed')
});

const numberStream$: Observable<number> = of(1,2,3,4,5);

numberStream$.pipe(
  map((number: number) =>
    number * 10
  )
).subscribe((number: number) => console.log(number));

const filter$: Observable<number> = of(1,2,3,4,5,6,7,8);

filter$.pipe(
  filter((n: number) => n % 2 === 0)
).subscribe((n: number) => console.log(n));

interval(1000).pipe(
  take(5)
).subscribe((val: number) => console.log(val));