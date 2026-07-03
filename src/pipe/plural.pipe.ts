import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { IUser } from '../interfaces/IUser';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  localStorageService: LocalStorageService = inject(LocalStorageService);

  transform(
    value: number | undefined,
    textFormOne: string,
    textFormTwo: string,
    textFormThree: string,
  ): string {
    const users: IUser[] | null = this.localStorageService.getValue<IUser[] | null>('users') ?? [];
    const remainderX10: number = users.length % 10;
    const remainderX100: number = users.length % 100;

    if (remainderX100 >= 11 && remainderX100 <= 14) {
      return textFormThree;
    }

    if (remainderX10 >= 2 && remainderX10 <= 4) {
      return textFormTwo;
    }

    if (remainderX10 === 1) {
      return textFormOne;
    }

    return textFormThree;
  }
}
