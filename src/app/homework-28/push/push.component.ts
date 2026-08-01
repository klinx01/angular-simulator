import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-push',
  imports: [],
  templateUrl: './push.component.html',
  styleUrl: './push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushComponent {

  http: HttpClient = inject(HttpClient);
  counter = 0;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.cdr.detach();
  }

  scenarioOne(): void {
    setTimeout(() => {
      this.cdr.reattach();
      this.counter++;
      this.cdr.markForCheck();
    }, 1000);
  }

  scenarioTwo(): void {
    this.http
      .get('https://dummyjson.com/auth/me')
      .pipe(
        tap(() => {
          this.cdr.reattach();
          this.counter++;
        }),
      )
      .subscribe();
  }

  scenarioThree(): void {
    setInterval(() => {
      this.cdr.reattach();
      this.counter++;
      this.cdr.markForCheck();
    }, 1000);
  }

  scenarioFour(): void {
    Promise.resolve().then(() => {
      this.cdr.reattach();
      this.counter++;
    });
  }

  scenarioFive(): void {
    this.counter++;
    this.cdr.reattach();
  }

}

/* MarkForCheck
  1 сценарий 
    1. Интерфейс сразу обновился
    2. да
    3. changeDetection произошел сразу при следующем цикле, то есть когда я нажму на другую кнопку или что то еще, и когда нажму на эту кнопку то там уже прибавится 1 от моего сет таймаута
    4. потому что onPush не реагирует на асинхронные события, на них реагирует zone.js и он сообщает анугуляру что этот компонент надо перерисовать вот по этому без markForCheck не работало, то есть если я сразу сделаю MarkForCheck тогда это компонент проверится сразу же 
  
    в остальных сценарих те же ответы кроме третьего (там я поменял только сет таймаут на запрос/setInterval)
*/

/* detectChanges
  1 сценарий 
    1. если поставить detectChanges в начало то интерфейс не обновится
    2. да
    3. этот компонент
    4. если его использовали detach, нужно немедленно обновить интерфейс

    в остальных сценарих те же ответы
*/

/* detach
    1. нет
    2. да, потому что detach не отключает глобальный changeDetection, он не обновляет DOM
    3. потому что detach отключает проверку компонента
    4. все
*/

/* reattach
    1. интерфейс начал обновлятся
    2. когда я использую метод с reattach
    4. чтобы корректно работал счетчик для асинхронных событий да, для клика нет.
    Если вопрос заключается в том нужно ли вызывать их для того чтобы компонент снова вошел в changeDetection - нет
*/
