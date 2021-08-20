import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentReadRequest } from '@myrmidon/pythia-document-reader';

@Component({
  selector: 'pythia-pythia-document-list-page',
  templateUrl: './pythia-document-list-page.component.html',
  styleUrls: ['./pythia-document-list-page.component.css'],
})
export class PythiaDocumentListPageComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public onReadRequest(request: DocumentReadRequest): void {
    // https://www.digitalocean.com/community/tutorials/angular-query-parameters
    if (request.end) {
      this._router.navigate(['/documents', request.documentId], {
        queryParams: {
          start: request.start,
          end: request.end,
        },
        queryParamsHandling: 'preserve'
      });
    } else {
      this._router.navigate(['/documents', request.documentId]);
    }
  }
}
