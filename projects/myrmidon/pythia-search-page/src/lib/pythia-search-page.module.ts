import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaDocumentListModule } from '@myrmidon/pythia-document-list';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaSearchModule } from '@myrmidon/pythia-search';
import { PythiaSearchPageComponent } from './components/pythia-search-page/pythia-search-page.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: '',
    pathMatch: 'full',
    component: PythiaSearchPageComponent,
  },
]);

@NgModule({
  declarations: [PythiaSearchPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaDocumentListModule,
    PythiaSearchModule,
  ],
  exports: [PythiaSearchPageComponent],
  providers: [EnvServiceProvider],
})
export class PythiaSearchPageModule {}
