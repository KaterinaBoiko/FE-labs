import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { DetailsComponent } from './components/details/details.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/rates', pathMatch: 'full' },
  { path: 'rates', component: MainComponent },
  { path: 'converter', component: ConverterComponent },
  { path: ':currency', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class RoutingModule { }