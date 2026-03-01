import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  private saveLastVisit(): void {
    const nowDate: string = new Date().toISOString();
    this.localStorageService.setValue('last-visit', nowDate);
  }

  private saveVisitCount(): void {
    const visit: unknown = this.localStorageService.getValue('visits');
    const currentVisit: number = visit ? Number(visit) : 0;
    this.localStorageService.setValue('visits', currentVisit + 1);
  }

}