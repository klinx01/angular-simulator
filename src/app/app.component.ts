import { Component, inject} from '@angular/core';
import './training.ts'
import { Color } from '../enums/Color'
import { Collection } from './collection.js';
import { IOffer } from '../interfaces/IOffer.js';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../interfaces/ILocation.js';
import { IParticipant } from '../interfaces/IParticipant.js';
import { IDirection } from '../interfaces/IDirection.js';
import { INewsCard } from '../interfaces/INewsCard.js';
import { NgTemplateOutlet } from "@angular/common";
import { Message } from '../enums/Message.js';
import { LocalStorageService } from '../local-storage.service.js'

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  numbers: Collection<number> = new Collection([1, 2, 3, 4]);
  products: Collection<string> = new Collection(['молоко', 'хлеб', 'колбаса', 'яблоко']);
  companyName: string = 'румтибет';
  selectedLocation: string = '';
  selectedParticipant: string = '';
  dateHike!: string;
  currentDate!: string;
  liveInput!: string;
  isLoading: boolean = true;
  counter: number = 0;
  currentFunctionality: string = 'timer';
  selectedCardId!: number;
  Message = Message;
  currentMessage!: Message | null;

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
    this.saveLastVisit();
    this.saveVisitCount();
    this.isPrimaryColor(Color.BLACK);
    this.isFormValid();

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  selectedCard(newsCardId: number): void {
    this.selectedCardId = newsCardId;
  }

  isFormValid(): boolean {
    return !!this.selectedLocation && !!this.dateHike && !!this.selectedParticipant;
  }

  increaseCounter(): void {
     this.counter += 1;
  }

  decreaseCounter(): void {
    this.counter -= 1;
  }

  closeMsg(): void {
    this.currentMessage = null;
  }

  showWarnMsg(): void {
    this.currentMessage = Message.WARN;
    setTimeout(() => {
      this.currentMessage = null;
    }, 3000);
  }

  showInfoMsg(): void {
    this.currentMessage = Message.INFO;
    setTimeout(() => {
      this.currentMessage = null;
    }, 3000);
  }

  showErrorMsg(): void {
    this.currentMessage = Message.ERROR;
    setTimeout(() => {
      this.currentMessage = null;
    }, 3000);
  }

  showSuccessMsg(): void {
    this.currentMessage = Message.SUCCESS;
    setTimeout(() => {
      this.currentMessage = null;
    }, 3000);
  }

  showClicker(): void {
    this.currentFunctionality = 'clicker';
  }

  showDate(): void {
    this.currentFunctionality = 'timer';
  }

  private updateCurrentTime(): void {
    this.currentDate = new Date().toLocaleString();
  }

  private isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

  private saveLastVisit(): void {
    const nowDate: string = new Date().toISOString();
    this.localStorageService.setValue('last-visit', nowDate);
  }

  private saveVisitCount(): void {
    const visit = this.localStorageService.getValue('visits');
    const currentVisit: number = visit ? Number(visit) : 0;
    this.localStorageService.setValue('visits', currentVisit + 1);
  }

}