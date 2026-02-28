import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  services: string[] = [
    'Прогулки в горы летом',
    'Зимние походы в горы',
    'Посещение храмов в горах',
    'Экстремальные виды туризма',
    'Походы в джунглях Амазонии',
    'Поездка в Африку'
  ];

  info: string[] = [
   'Как собрать в долгий поход?',
   'Жизненно важные предметы для похода',
   'Медицинская страховка, гарантии безопасности',
   'Если вы врач - загляните сюда'
  ];

  constructor() {

  }

}
