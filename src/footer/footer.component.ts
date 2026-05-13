import { Component } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome'
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
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

  faSkype: IconDefinition = faSkype;
  faPinterest: IconDefinition = faPinterest;
  faVk: IconDefinition = faVk;
  faTelegram: IconDefinition = faTelegram;
  faAngleRight: IconDefinition = faAngleRight;

}
