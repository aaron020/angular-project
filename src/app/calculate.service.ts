import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PensionData } from './models/pension-data';
import { PensionRequestData } from './models/pension-request';
import { Observable } from 'rxjs';
import { PensionResponse } from './models/pension-response';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  private httpClient = inject(HttpClient);


  private calculateDefinedContribution(data: PensionData): number{
    const yearsToRetire = data.retirementAge - data.currentAge;
    return (yearsToRetire * 12 * data.pensionContribution + data.pensionPot) * 4;
  }

  private calculateTotalIncome(data: PensionData): number {
    return this.calculateDefinedContribution(data) + data.statePension + data.finalSalaryPension
  }


  calculatePension(pensionData: PensionData): Observable<PensionResponse>{
    const pensionRequestData : PensionRequestData = {
      data: {
        collectedData: pensionData,
        calculatedData: {
          definedContributionTotal: this.calculateDefinedContribution(pensionData),
          totalIncome: this.calculateTotalIncome(pensionData)
        }
      }
    }
    return this.httpClient.post<PensionResponse>('http://localhost:8080/api/forecast', pensionRequestData)
  }
}
