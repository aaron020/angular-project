import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-menu',
  imports: [FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  countryService = inject(CountryService);
  ngOnInit(): void {
    this.countryService.loadFromStorage()
  }

}
