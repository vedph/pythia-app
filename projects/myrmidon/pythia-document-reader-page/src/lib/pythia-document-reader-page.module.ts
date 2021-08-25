import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EnvServiceProvider, NgToolsModule } from '@myrmidon/ng-tools';

import { PythiaApiModule } from '@myrmidon/pythia-api';
import { PythiaCoreModule } from '@myrmidon/pythia-core';
import { PythiaDocumentReaderModule } from '@myrmidon/pythia-document-reader';
import { PythiaMaterialModule } from '@myrmidon/pythia-material';
import { PythiaDocumentReaderPageComponent } from './components/pythia-document-reader-page/pythia-document-reader-page.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: '',
    pathMatch: 'full',
    component: PythiaDocumentReaderPageComponent,
  },
]);

@NgModule({
  declarations: [PythiaDocumentReaderPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // Pythia
    PythiaApiModule,
    PythiaCoreModule,
    PythiaMaterialModule,
    PythiaDocumentReaderModule,
    NgToolsModule
  ],
  exports: [PythiaDocumentReaderPageComponent],
  providers: [EnvServiceProvider],
})
export class PythiaDocumentReaderPageModule {}
