import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EnvServiceProvider, PythiaCoreModule } from '@myrmidon/pythia-core';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PythiaCoreModule],
  exports: [],
  providers: [EnvServiceProvider],
})
export class PythiaApiModule {}
