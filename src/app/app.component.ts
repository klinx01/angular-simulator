import { Component } from '@angular/core';
import './training.ts'
import { Color } from '../enums/Color'
import { Collection } from './Collection.js';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  companyName: string = 'румтибет'
   constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  getLastVisit(): string | null {
    return localStorage.getItem('lastVisit');
  }

  saveLastVisit(): void {
    const nowDate = new Date().toISOString();
    localStorage.setItem('lastVisit', nowDate);
  }

  saveVisitCount(): void {
    const visit = localStorage.getItem('visits');
    const currentvisit = visit ? Number(visit) : 0;
    const next = currentvisit + 1;
    localStorage.setItem('visits', String(next));
  }
}

function isPrimaryColor(color: Color): boolean {
  if (color === Color.RED || color === Color.GREEN || color === Color.BLUE) {
    return true;
  } else {
  return false;
  }
}

const numbers = new Collection<number>([1, 2, 3, 4]);

const products = new Collection<string>(['молоко', 'хлеб', 'колбаса', 'яблоко']);

