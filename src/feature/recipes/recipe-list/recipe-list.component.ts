import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { IRecipe } from '../interfaces/IRecipe';
import { recipeActions } from '../state/recipe.actions';
import { selectError, selectLoading, selectRecipes } from '../state/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  imports: [AsyncPipe, ButtonModule, SkeletonModule, TableModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit {

  private store: Store = inject(Store);

  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  mockData: IRecipe[] = Array(10).fill(1);

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }

}
