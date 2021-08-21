import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaUiModule } from '@myrmidon/pythia-ui';
import { CorpusFilterComponent } from './components/corpus-filter/corpus-filter.component';
import { CorpusListComponent } from './components/corpus-list/corpus-list.component';
import { CorpusEditorComponent } from './components/corpus-editor/corpus-editor.component';

@NgModule({
  declarations: [
    CorpusFilterComponent,
    CorpusListComponent,
    CorpusEditorComponent,
  ],
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
  exports: [CorpusFilterComponent, CorpusListComponent, CorpusEditorComponent],
  providers: [EnvServiceProvider],
})
export class PythiaCorpusListModule {}
