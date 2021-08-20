import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';

import { PythiaStatsComponent } from './components/pythia-stats/pythia-stats.component';

@NgModule({
  declarations: [PythiaStatsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaMaterialModule,
  ],
  exports: [PythiaStatsComponent],
  providers: [EnvServiceProvider],
})
export class PythiaStatsModule {}
