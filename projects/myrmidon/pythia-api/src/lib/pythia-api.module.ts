import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EnvServiceProvider, NgToolsModule } from '@myrmidon/ng-tools';
import { PythiaCoreModule } from '@myrmidon/pythia-core';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PythiaCoreModule, NgToolsModule],
  exports: [],
  providers: [EnvServiceProvider],
})
export class PythiaApiModule {}
