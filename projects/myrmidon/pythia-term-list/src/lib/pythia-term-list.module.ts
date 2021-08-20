import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaUiModule } from '@myrmidon/pythia-ui';

import { TermFilterComponent } from './components/term-filter/term-filter.component';
import { TermListComponent } from './components/term-list/term-list.component';

@NgModule({
  declarations: [TermFilterComponent, TermListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaUiModule,
  ],
  exports: [TermFilterComponent, TermListComponent],
  providers: [EnvServiceProvider],
})
export class PythiaTermListModule {}
