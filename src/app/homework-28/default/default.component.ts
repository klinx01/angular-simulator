import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-default',
  imports: [],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {

  http: HttpClient = inject(HttpClient);
  counter = 0;

  scenarioOne(): void {
    this.counter++;
  }
  // 1. да
  // 2. 1
  // 3. нет
  // 4. клик по кнопке

  scenarioTwo(): void {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }
  // 1. да
  // 2. 2
  // 3. нет
  // 4. 1 раз при клике и второй раз когда сработал setTimeout

  scenarioThree(): void {
    Promise.resolve().then(() => {
      this.counter++;
    });
  }
  // 1. да
  // 2. 1
  // 3. нет
  // 4. по идее должно быть 2, но вызывается 1. Как я понял это потому что ангуляр ждет конца цикла и в потенциале может записать 2 вызова в 1

  scenarioFour(): void {
    this.http
      .get('https://dummyjson.com/auth/me')
      .pipe(
        tap(() => {
          this.counter++;
        }),
      )
      .subscribe();
  }
  // 1. да
  // 2. 2
  // 3. нет
  // 4. вообще мне пишет что выполнилось 3 раза changeDetection, хотя по логике 2
  // 1. когда я нажимаю на кнопку
  // 2. когда запрос завершается
  // поэтому я считаю что 2 раза, но ngDoCheck почему то показывает 3 раза, нейронка говорит вот что:
  //В dev-режиме Angular может выполнить дополнительную проверку стабильности (в частности, второй проход проверки),
  // поэтому ты можешь увидеть еще 2 вызова ngDoCheck() вместо одного.
  // так что я хз че это и считаю что происходит 2 раза

  scenarioFive(): void {
    setInterval(() => {
      this.counter++;
    }, 1000);
  }
  // 1. да
  // 2. 1 и до бесконечности
  // 3. нет
  // 4. 1 раз срабаывает при клике и потом каждый раз когда происходит setInterval

}
