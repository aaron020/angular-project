import { Component, inject } from '@angular/core';
import { CountryService } from '../country.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PensionData } from '../models/pension-data';
import { CalculateService } from '../calculate.service';
import { Router } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent{
  countryService = inject(CountryService);
  calculateService = inject(CalculateService);
  private router = inject(Router);

  currency = this.countryService.currency;

  isLoading = false;

  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    currentAge: [null, [Validators.required, Validators.min(0), Validators.max(150)]],
    retirementAge: [null, [Validators.required, Validators.min(0), Validators.max(150)]],
    statePension: [null, [Validators.required, Validators.min(0)]],
    finalSalaryPension: [null, [Validators.required, Validators.min(0)]],
    pensionPot: [null, [Validators.required, Validators.min(0)]],
    pensionContribution: [null, [Validators.required, Validators.min(0)]]
  });


  scrollToInvalidControl(){
    const firstInvalid = document.querySelector('.ng-invalid');

    if (firstInvalid) {
      (firstInvalid as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  submit(){
    if (this.form.valid){
      this.isLoading = true;
      const pensionRequest = this.form.value as PensionData;
      console.log(pensionRequest);
      this.calculateService.calculatePension(pensionRequest).subscribe({
        next: (reference) => {
          this.isLoading = false;
          this.router.navigate(['forecast', reference.reference]);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Server error:', err);
          this.router.navigate(['error']); 
        }
      });
    }else{
      this.form.markAllAsTouched();
      return;
    }
  }
}
