import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryService } from '../country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastResponse } from '../models/forecast-response';
import { ForecastService } from '../forecast.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-forecast',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit{
  reference = '';
  private route = inject(ActivatedRoute);
  private forecastService = inject(ForecastService);
  private router = inject(Router);

  isLoading = false;

  forecast = signal<ForecastResponse | null>(null);

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.reference = params['reference']
      console.log(this.reference)
      this.forecastService.getForecast(this.reference).subscribe(data => {
        this.forecast.set(data);
        this.isLoading = false;
      })

      this.forecastService.getForecast(this.reference).subscribe({
        next: (data) => {
          if (!data) {
            console.warn('Empty response');
            this.isLoading = false;
            this.router.navigate(['error']); 
          }
          this.forecast.set(data);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Server error:', err);
          this.router.navigate(['error']); 
        }
      })
    })
    
  }
  countryService = inject(CountryService)
  currency = this.countryService.currency

}
