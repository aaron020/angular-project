import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForecastComponent } from './forecast/forecast.component';
import { GeneralErrorComponent } from './general-error/general-error.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "calculator", component: CalculatorComponent},
    {path: "forecast/:reference", component: ForecastComponent},
    {path: "error", component: GeneralErrorComponent},
    {path: "**", component: NotfoundComponent}
];
