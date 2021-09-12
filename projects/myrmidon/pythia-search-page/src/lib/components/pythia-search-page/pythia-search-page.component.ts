import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pythia-pythia-search-page',
  templateUrl: './pythia-search-page.component.html',
  styleUrls: ['./pythia-search-page.component.css']
})
export class PythiaSearchPageComponent implements OnInit {
  public initialQueryTerm: string | undefined;

  constructor(route: ActivatedRoute) {
    if ('term' in route.snapshot.params) {
      this.initialQueryTerm = route.snapshot.params['term'];
    }
  }

  ngOnInit(): void {
  }
}
