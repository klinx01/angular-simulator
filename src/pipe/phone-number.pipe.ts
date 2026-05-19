import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';


@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneNumber: string, phoneNumberStyle: 'compact' | 'international' | 'national' | 'masked' ): string {
    const filteredNumber: string = phoneNumber.toString().replace(/\D/g, '');
    const countryCode: string = filteredNumber.slice(0, 2);
    const pOne: string = filteredNumber.slice(2, 5);
    const pTwo: string = filteredNumber.slice(5, 8);
    const pThree: string = filteredNumber.slice(8, 10);
    const pFour: string = filteredNumber.slice(10, 12);

     switch (phoneNumberStyle) {
      case 'compact':
        return `+${ filteredNumber }`;
      case 'international':
       return  `+${ countryCode } ${ pOne } ${ pTwo } ${ pThree } ${ pFour }`;
      case 'national':
       return `${ pOne } ${ pTwo } ${ pThree } ${ pFour }`;
      case 'masked':
       return `+${ countryCode } ${ pOne } *** ** ${ pFour }`;
     }
  }

}
