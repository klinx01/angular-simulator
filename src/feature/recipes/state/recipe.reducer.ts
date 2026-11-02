import { createReducer, on } from '@ngrx/store';
import { IRecipesState } from '../interfaces/IRecipesState';
import { recipeActions } from './recipe.actions';

export const initialRecipesState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipeReducer = createReducer(
  initialRecipesState,
  on(recipeActions.loadRecipes, (state: IRecipesState) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(recipeActions.loadRecipesSuccess, (state: IRecipesState, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
    error: null,
  })),
  on(recipeActions.loadRecipesFailure, (state: IRecipesState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
