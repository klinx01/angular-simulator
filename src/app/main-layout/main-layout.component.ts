import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { LoaderComponent } from '../../loader/loader.component';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MessageComponent, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
