import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvServiceProvider, NgToolsModule } from '@myrmidon/ng-tools';

import { PythiaApiModule } from '@myrmidon/pythia-api';
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
    NgToolsModule
  ],
  exports: [PythiaStatsComponent],
  providers: [EnvServiceProvider],
})
export class PythiaStatsModule {}
