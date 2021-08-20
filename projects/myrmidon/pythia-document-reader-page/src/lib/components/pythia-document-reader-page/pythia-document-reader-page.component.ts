import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentReadRequest } from '@myrmidon/pythia-document-reader';

@Component({
  selector: 'pythia-pythia-document-reader-page',
  templateUrl: './pythia-document-reader-page.component.html',
  styleUrls: ['./pythia-document-reader-page.component.css']
})
export class PythiaDocumentReaderPageComponent implements OnInit {
  public request: DocumentReadRequest | undefined;

  constructor(route: ActivatedRoute) {
    // get id and optionally start and end from query params
    const request: DocumentReadRequest = {
      documentId: route.snapshot.params.id
    };
    if ('start' in route.snapshot.queryParams) {
      request.start = +route.snapshot.queryParams['start'];
    }
    if ('end' in route.snapshot.queryParams) {
      request.end = +route.snapshot.queryParams['end'];
    }
    this.request = request;
  }

  ngOnInit(): void {
  }
}
