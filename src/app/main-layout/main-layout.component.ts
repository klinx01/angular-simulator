import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoaderComponent } from '../../core/loader/loader.component';
import { MessageComponent } from '../../core/message/message.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MessageComponent, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
