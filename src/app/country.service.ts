import { computed, Injectable, signal } from '@angular/core';

type CountryCode = 'ireland' | 'uk' | 'usa';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  readonly country = signal<CountryCode>('ireland');

  readonly currency = computed(() => {
    switch (this.country()) {
        case 'uk': return '£';
        case 'usa': return '$';
        case 'ireland':
        default: return '€';
      }
  });

  setCountry(code: CountryCode){
    this.country.set(code)
    localStorage.setItem('country', code);
  }

  loadFromStorage() {
    const saved = localStorage.getItem('country') as CountryCode | null;
    if (saved === 'ireland' || saved === 'uk' || saved === 'usa') {
      this.country.set(saved);
    }
  }
}
