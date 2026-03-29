import { Component, inject } from '@angular/core'; 
import { Color } from '../enums/Color'
import { Collection } from '../app/collection.js';
import { IOffer } from '../interfaces/IOffer.js';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../interfaces/ILocation.js';
import { IParticipant } from '../interfaces/IParticipant';
import { IDirection } from '../interfaces/IDirection.js';
import { INewsCard } from '../interfaces/INewsCard.js';
import { Message } from '../enums/Message.js';
import { MessageService } from '../message.service.js';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-page',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  numbers: Collection<number> = new Collection([1, 2, 3, 4]);
  products: Collection<string> = new Collection(['молоко', 'хлеб', 'колбаса', 'яблоко']);
  companyName: string = 'румтибет';
  selectedLocation: string = '';
  selectedParticipant: string = '';
  dateHike!: string;
  liveInput!: string;
  selectedCardId!: number;
  message: typeof Message = Message;

  participants: IParticipant[] = [
    { id: 1, name: 'Сиега' },
    { id: 2, name: 'Вадик' },
    { id: 3, name: 'Владислав' },
    { id: 4, name: 'Мария' },
    { id: 5, name: 'Павлик' },
    { id: 6, name: 'Эмануель' }
  ];

  locations: ILocation[] = [
    { id: 1, name: 'Шри-Ланка' },
    { id: 2, name: 'Бали' },
    { id: 3, name: 'Турция' },
    { id: 4, name: 'Мальдивы' },
    { id: 5, name: 'Испания' },
    { id: 6, name: 'Кенния' }
  ];

  offers: IOffer[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'program-icon-human'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'program-icon-shield'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'program-icon-town'
    }
  ];

  directions: IDirection[] = [
    {
      id: 1,
      name: 'Озеро возле гор',
      rating: '4.9',
      description: 'романтическое приключение',
      price: 480,
      img: 'lake-near-mountains'
    },
    {
      id: 2,
      name: 'Ночь в горах',
      rating: '4.5',
      description: 'в компании друзей',
      price: 500,
      img: 'night-in-the-mountains'
    },
    {
      id: 3,
      name: 'Йога в горах',
      rating: '5.0',
      description: 'для тех, кто забоится о себе',
      price: 230,
      img: 'yoga-in-the-mountains'
    }
  ];

  newsCards: INewsCard[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      img: 'italy-city',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      img: 'airplane',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих условий',
      date: '01/04/2023'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      img: 'solo-travel',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023'
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      img: 'india-mausoleum',
      description: 'Для современного мира базовый.',
      date: '01/04/2023'
    }
  ];

  constructor() {
    this.isPrimaryColor(Color.BLACK);
    this.isFormValid();
  }

  isFormValid(): boolean {
    return !!this.selectedLocation && !!this.dateHike && !!this.selectedParticipant;
  }

  private isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

}