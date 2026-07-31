import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  user = {
    name: 'Alex',
    age: 20,
  };

  // Имя не менялось потому что onPush проверяет ссылку на объект, а не изменились ли внутренности этого объекта
  // Решить эту проблему можно с помощью ngDoCheck c помощью detectChanges или markForCheck но это будет непроизводительно
  // Также можно другим способом проверить обновить через detectChanges или markForCheck
  // Но лучшее решение это просто изменить ссылку на объект

  changeName(): void {
    this.user = {
      ...this.user,
      name: 'Eugene',
    };
  }
}
