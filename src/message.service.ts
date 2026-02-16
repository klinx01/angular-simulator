import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from './enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];
  private lastId: number = 0;

  addMessage(type: Message, text: string): void {
    const newMessage: IMessage = { type, text, id: ++this.lastId }
    this.messages = [...this.messages, newMessage];
    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter(m => m.id !== id);
  }

}