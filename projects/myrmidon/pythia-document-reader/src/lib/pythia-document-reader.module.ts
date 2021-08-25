import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvServiceProvider, NgToolsModule } from '@myrmidon/ng-tools';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { DocumentReaderComponent } from './components/document-reader/document-reader.component';

@NgModule({
  declarations: [DocumentReaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    NgToolsModule
  ],
  exports: [DocumentReaderComponent],
  providers: [EnvServiceProvider],
})
export class PythiaDocumentReaderModule {}
