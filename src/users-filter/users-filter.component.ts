import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();

   searchControl: FormControl<string | null> = new FormControl('');
   private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string | null) => this.onFilter.emit(value || '')),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
