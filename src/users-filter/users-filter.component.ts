import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-filter',
  imports: [],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() OnSearch: EventEmitter<string> = new EventEmitter<string>();

  OnInput(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    this.OnSearch.emit(inputValue);
  }

}
