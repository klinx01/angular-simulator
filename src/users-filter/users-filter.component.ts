import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-filter',
  imports: [],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  OnInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.search.emit(inputValue);
  }

}
