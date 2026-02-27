import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  currentFunctionality: string = 'timer';
  counter: number = 0;
  currentDate!: string;

  navigations: INavigation[] = [
    { id: 'home-page', name: 'Главная', path: '/' },
    { id: 'users', name: 'Пользователи', path: '/users' }
  ];

  constructor() {
    setTimeout(() => {
      this.updateCurrentTime();
    }, 0);

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  increaseCounter(): void {
    this.counter += 1;
  }

  decreaseCounter(): void {
    this.counter -= 1;
  }

  showClicker(): void {
    this.currentFunctionality = 'clicker';
  }

  private updateCurrentTime(): void {
    this.currentDate = new Date().toLocaleString();
  }

  showDate(): void {
    this.currentFunctionality = 'timer';
  }

}
