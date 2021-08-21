import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaDocumentReaderModule } from '@myrmidon/pythia-document-reader';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaUiModule } from '@myrmidon/pythia-ui';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaDocumentReaderModule,
    PythiaUiModule,
  ],
  exports: [SearchComponent],
  providers: [EnvServiceProvider],
})
export class PythiaSearchModule {}
