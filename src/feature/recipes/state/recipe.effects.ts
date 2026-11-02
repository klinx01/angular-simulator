import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { IRecipeResponse } from '../interfaces/IRecipeResponse';
import { RecipeApiService } from '../services/recipe-api.service';
import { recipeActions } from './recipe.actions';

@Injectable()
export class RecipeEffects {

  private actions$: Actions = inject(Actions);
  private recipeApiService: RecipeApiService = inject(RecipeApiService);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipeActions.loadRecipes),
      exhaustMap(() =>
        this.recipeApiService.getRecipes().pipe(
          map((res: IRecipeResponse) => recipeActions.loadRecipesSuccess({ recipes: res.recipes })),
          catchError(() =>
            of(recipeActions.loadRecipesFailure({ error: 'Не удалось загрузить рецепты' })),
          ),
        ),
      ),
    ),
  );

}
