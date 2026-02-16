import { Message } from '../enums/Message';

export interface IMessage {
  id: number;
  type: Message;
  text: string;
}