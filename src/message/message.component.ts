import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../app/tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  appConfig: IAppConfig = inject(APP_CONFIG);

}
