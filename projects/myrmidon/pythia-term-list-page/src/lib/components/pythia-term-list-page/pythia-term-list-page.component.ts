import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pythia-term-list-page',
  templateUrl: './pythia-term-list-page.component.html',
  styleUrls: ['./pythia-term-list-page.component.css']
})
export class PythiaTermListPageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public requestSearch(term: string): void {
    this._router.navigate(['search', term]);
  }
}
