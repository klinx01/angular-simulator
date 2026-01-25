import { Component } from '@angular/core';
import './training.ts'
import { Color } from '../enums/Color'
import { Collection } from './collection.js';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  numbers: Collection<number> = new Collection([1, 2, 3, 4]);
  products: Collection<string> = new Collection(['молоко', 'хлеб', 'колбаса', 'яблоко']);
  companyName: string = 'румтибет';

   constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
    this.isPrimaryColor(Color.BLACK);
  }

  isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
}

  saveLastVisit(): void {
    const nowDate: string = new Date().toISOString();
    localStorage.setItem('last-visit', nowDate);
  }

  saveVisitCount(): void {
    const visit: string | null = localStorage.getItem('visits');
    const currentVisit: number = visit ? Number(visit) : 0;
    const newVisit: string = String(currentVisit + 1);
    localStorage.setItem('visits', newVisit);
  }

}