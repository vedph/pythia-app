import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { LookupCorpusComponent } from './components/lookup-corpus/lookup-corpus.component';
import { LookupProfileComponent } from './components/lookup-profile/lookup-profile.component';

@NgModule({
  declarations: [
    DocumentFilterComponent,
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
    PythiaMaterialModule
  ],
  exports: [
    DocumentFilterComponent,
    DocumentListComponent,
    LookupCorpusComponent,
    LookupProfileComponent
  ],
})
export class PythiaDocumentModule {}
