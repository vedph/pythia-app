import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { EnvServiceProvider } from '@myrmidon/ng-tools';
import {
  AuthJwtInterceptor,
  AuthJwtLoginModule,
} from '@myrmidon/auth-jwt-login';
import { AuthJwtAdminModule } from '@myrmidon/auth-jwt-admin';

import { PythiaApiModule } from 'projects/myrmidon/pythia-api/src/public-api';
import { PythiaCoreModule } from 'projects/myrmidon/pythia-core/src/public-api';
import { PythiaMaterialModule } from 'projects/myrmidon/pythia-material/src/public-api';
import { PythiaStatsModule } from 'projects/myrmidon/pythia-stats/src/public-api';
import { PythiaUiModule } from 'projects/myrmidon/pythia-ui/src/public-api';

import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ManageUsersPageComponent } from './components/manage-users-page/manage-users-page.component';
import { RegisterUserPageComponent } from './components/register-user-page/register-user-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    ManageUsersPageComponent,
    RegisterUserPageComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Akita
    AkitaNgDevtools.forRoot(),
    // Auth
    AuthJwtLoginModule,
    AuthJwtAdminModule,
    // Pythia
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaApiModule,
    PythiaStatsModule,
    PythiaUiModule,
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
