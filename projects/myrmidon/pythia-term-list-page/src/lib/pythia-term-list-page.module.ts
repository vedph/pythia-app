import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaTermListModule } from '@myrmidon/pythia-term-list';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaTermListPageComponent } from './components/pythia-term-list-page/pythia-term-list-page.component';
import { EnvServiceProvider, NgToolsModule } from '@myrmidon/ng-tools';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: '',
    pathMatch: 'full',
    component: PythiaTermListPageComponent,
  },
]);

@NgModule({
  declarations: [PythiaTermListPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaTermListModule,
    NgToolsModule
  ],
  exports: [PythiaTermListPageComponent],
  providers: [EnvServiceProvider],
})
export class PythiaTermListPageModule {}
