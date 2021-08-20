import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PythiaApiModule } from '@myrmidon/pythia-api';

import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaCorpusListModule } from '@myrmidon/pythia-corpus-list';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';

import { PythiaCorpusListPageComponent } from './components/pythia-corpus-list-page/pythia-corpus-list-page.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: '',
    pathMatch: 'full',
    component: PythiaCorpusListPageComponent,
  },
]);

@NgModule({
  declarations: [PythiaCorpusListPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaCorpusListModule,
  ],
  exports: [PythiaCorpusListPageComponent],
  providers: [EnvServiceProvider],
})
export class PythiaCorpusListPageModule {}
