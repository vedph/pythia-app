import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'corpora',
    loadChildren: () =>
      import('@myrmidon/pythia-corpus-list-page').then(
        (module) => module.PythiaCorpusListPageModule
      ),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('@myrmidon/pythia-document-list-page').then(
        (module) => module.PythiaDocumentListPageModule
      ),
    // canActivate: [AuthGuardService]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
    // flex
    FlexLayoutModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
