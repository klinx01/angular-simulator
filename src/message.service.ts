import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from './enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  message$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(type: Message, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messagesSubject.next([newMessage, ...this.messagesSubject.getValue()]);

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
    const updatedMessages: IMessage[] = this.messagesSubject.getValue()
    .filter((m: IMessage) => m !== message);
    this.messagesSubject.next(updatedMessages);
  }

}