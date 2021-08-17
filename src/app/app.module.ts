import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PythiaMaterialModule } from 'projects/myrmidon/pythia-material/src/public-api';
import { PythiaCoreModule } from 'projects/myrmidon/pythia-core/src/public-api';
import { PythiaApiModule } from 'projects/myrmidon/pythia-api/src/public-api';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Pythia
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaApiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
