import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { HomeComponent } from './components/home/home.component';

import { PythiaApiModule } from 'projects/myrmidon/pythia-api/src/public-api';
import { PythiaCoreModule } from 'projects/myrmidon/pythia-core/src/public-api';
import { PythiaMaterialModule } from 'projects/myrmidon/pythia-material/src/public-api';
import { PythiaUiModule } from '@myrmidon/pythia-ui';
import { PythiaStatsModule } from 'projects/myrmidon/pythia-stats/src/public-api';
import { EnvServiceProvider } from '@myrmidon/ng-tools';
import { AuthJwtInterceptor } from '@myrmidon/auth-jwt-login';
// import { PythiaDocumentListModule } from 'projects/myrmidon/pythia-document-list/src/public-api';
// import { PythiaDocumentReaderModule } from 'projects/myrmidon/pythia-document-reader/src/public-api';

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
    PythiaStatsModule,
    PythiaUiModule
  ],
  providers: [
    EnvServiceProvider,
    // HTTP interceptor
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
