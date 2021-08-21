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
  {
    path: 'documents/:id',
    loadChildren: () =>
      import('@myrmidon/pythia-document-reader-page').then(
        (module) => module.PythiaDocumentReaderPageModule
      ),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('@myrmidon/pythia-term-list-page').then(
        (module) => module.PythiaTermListPageModule
      ),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@myrmidon/pythia-search-page').then(
        (module) => module.PythiaSearchPageModule
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
