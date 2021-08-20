import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PythiaApiModule } from '@myrmidon/pythia-api';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LookupCorpusComponent } from './components/lookup-corpus/lookup-corpus.component';
import { LookupProfileComponent } from './components/lookup-profile/lookup-profile.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    LookupCorpusComponent,
    LookupProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pythia
    PythiaApiModule,
    PythiaMaterialModule,
  ],
  exports: [
    ConfirmDialogComponent,
    LookupCorpusComponent,
    LookupProfileComponent,
  ],
})
export class PythiaUiModule {}
