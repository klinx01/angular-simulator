import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeResponse } from '../interfaces/IRecipeResponse';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  private http: HttpClient = inject(HttpClient);

  getRecipes(): Observable<IRecipeResponse> {
    return this.http.get<IRecipeResponse>('https://dummyjson.com/recipes');
  }

}
