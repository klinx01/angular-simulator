import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from './enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];

  private addMessage(type: Message, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messages = [...this.messages, newMessage];

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  showInfo(text: string): void {
    this.addMessage(Message.INFO, text);
  }

  showWarn(text: string): void {
    this.addMessage(Message.WARN, text);
  }

  showSuccess(text: string): void {
    this.addMessage(Message.SUCCESS, text);
  }

  showError(text: string): void {
    this.addMessage(Message.ERROR, text);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((m: IMessage) => m !== message);
  }

}