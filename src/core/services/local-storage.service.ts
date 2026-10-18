import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: string): T | null {
    const item: string | null = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
