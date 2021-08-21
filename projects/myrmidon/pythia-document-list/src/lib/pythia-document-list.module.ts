import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaUiModule } from '@myrmidon/pythia-ui';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentInfoComponent } from './components/document-info/document-info.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentCorpusComponent } from './components/document-corpus/document-corpus.component';

@NgModule({
  declarations: [
    DocumentFilterComponent,
    DocumentInfoComponent,
    DocumentListComponent,
    DocumentCorpusComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaUiModule
  ],
  exports: [
    DocumentFilterComponent,
    DocumentInfoComponent,
    DocumentListComponent,
  ],
  providers: [EnvServiceProvider],
})
export class PythiaDocumentListModule {}
