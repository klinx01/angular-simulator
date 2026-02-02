import { Component, input } from '@angular/core';
import './training.ts'
import { Color } from '../enums/Color'
import { Collection } from './collection.js';
import { IOffers } from '../interfaces/IOffers.js';
import { FormsModule } from '@angular/forms';
import { ILocations } from '../interfaces/ILocations.js';
import { IParticipants } from '../interfaces/IParticipants.js';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  numbers: Collection<number> = new Collection([1, 2, 3, 4]);
  products: Collection<string> = new Collection(['молоко', 'хлеб', 'колбаса', 'яблоко']);
  companyName: string = 'румтибет';

  selectedLocation: string = "";
  selectedParticipant: string = "";
  dateHike: string = "";
  currentDate: string = "";
  liveInput: string = '';
  handleLoaded: boolean = false
  counter: number = 0;
  headerContent: string = 'timer';

   participants: IParticipants[] = [
    {
      id: 1,
      name: 'Сиега'
    },
    {
      id: 2,
      name: 'Вадик'
    },
    {
      id: 3,
      name: 'Владислав'
    },
    {
      id: 4,
      name: 'Мария'
    },
    {
      id: 5,
      name: 'Павлик'
    },
    {
      id: 6,
      name: 'Эмануель'
    }
  ]

  locations: ILocations[] = [
    {
      id: 1,
      name: 'Шри-Ланка'
    },
    {
      id: 2,
      name: 'Бали'
    },
    {
      id: 3,
      name: 'Турция'
    },
    {
      id: 4,
      name: 'Мальдивы'
    },
    {
      id: 5,
      name: 'Испания'
    },
    {
      id: 6,
      name: 'Кенния'
    }
  ]

  offers: IOffers[] = [
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
  ]

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
    this.isPrimaryColor(Color.BLACK);
    this.isFormValid();

    setInterval(() => {
      this.currentTime();
    }, 1000);

    setTimeout(() => {
      this.handleLoaded = true
    }, 2000)
  }

  isFormValid(): boolean {
    if (this.selectedLocation !== "" && this.dateHike !== "" && this.selectedParticipant !== "") {
      return true;
    } else {
      return false;
    }
  }

   addOne(): void {
     this.counter = this.counter + 1;
  }

  removeOne(): void {
    this.counter = this.counter - 1;
  }

  showClicker(): void {
    this.headerContent = 'clicker';
  }

  changeDate(): void {
    this.headerContent = 'timer';
  }

  private currentTime(): void {
    this.currentDate = new Date().toLocaleString();
  }

  private isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

  private saveLastVisit(): void {
    const nowDate: string = new Date().toISOString();
    localStorage.setItem('last-visit', nowDate);
  }

  private saveVisitCount(): void {
    const visit: string | null = localStorage.getItem('visits');
    const currentVisit: number = visit ? Number(visit) : 0;
    const newVisit: string = String(currentVisit + 1);
    localStorage.setItem('visits', newVisit);
  }

}