import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PythiaMaterialModule } from 'projects/myrmidon/pythia-material/src/public-api';
import { PythiaCoreModule } from 'projects/myrmidon/pythia-core/src/public-api';
import { PythiaApiModule } from 'projects/myrmidon/pythia-api/src/public-api';
import { EnvServiceProvider } from '@myrmidon/pythia-core';
import { AuthInterceptor } from '@myrmidon/pythia-api';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Akita
    AkitaNgDevtools.forRoot(),
    // Pythia
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaApiModule,
  ],
  providers: [
    EnvServiceProvider,
    // HTTP interceptor
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
