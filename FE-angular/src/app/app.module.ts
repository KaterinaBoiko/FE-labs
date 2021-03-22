import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ConverterComponent } from './components/converter/converter.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailsComponent } from './components/details/details.component';
import { appReducers } from './store/reducers/app.reducers';
import { effects } from './store/effects/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConverterComponent,
    HeaderComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    MaterialModule,
    FormsModule,
    ChartsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
