import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setValue(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string): unknown | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}