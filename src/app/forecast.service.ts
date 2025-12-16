import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastResponse } from './models/forecast-response';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private httpClient = inject(HttpClient);

  getForecast(reference: string): Observable<ForecastResponse> {
    return this.httpClient.get<ForecastResponse>(`http://localhost:8080/api/forecast/${reference}`)
  }
}
