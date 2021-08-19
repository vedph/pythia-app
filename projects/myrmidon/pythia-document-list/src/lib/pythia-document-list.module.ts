import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentInfoComponent } from './components/document-info/document-info.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { LookupCorpusComponent } from './components/lookup-corpus/lookup-corpus.component';
import { LookupProfileComponent } from './components/lookup-profile/lookup-profile.component';

@NgModule({
  declarations: [
    DocumentFilterComponent,
    DocumentInfoComponent,
    DocumentListComponent,
    LookupCorpusComponent,
    LookupProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
  ],
  exports: [
    DocumentFilterComponent,
    DocumentInfoComponent,
    DocumentListComponent,
    LookupCorpusComponent,
    LookupProfileComponent,
  ],
  providers: [
    EnvServiceProvider,
  ]
})
export class PythiaDocumentListModule {}
