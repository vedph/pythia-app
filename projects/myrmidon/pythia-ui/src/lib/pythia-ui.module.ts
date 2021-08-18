import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PythiaMaterialModule
  ],
  exports: [ConfirmDialogComponent],
})
export class PythiaUiModule {}
