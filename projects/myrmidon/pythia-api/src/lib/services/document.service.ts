import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DataPage,
  EnvService,
  ErrorService,
  Document,
} from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export enum DocumentSortOrder {
  Default = 0,
  Author,
  Title,
  Date,
}

export interface DocumentFilter {
  pageNumber: number;
  pageSize: number;
  corpusId?: string;
  author?: string;
  title?: string;
  source?: string;
  profileId?: string;
  minDateValue?: number;
  maxDateValue?: number;
  minTimeModified?: Date;
  maxTimeModified?: Date;
  attributes?: string; // name=value (CSV)
  sort?: DocumentSortOrder;
  descending?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  /**
   * Get the specified page of documents.
   * @param filter The filter.
   * @returns Observable with a page of documents.
   */
  public getDocuments(filter: DocumentFilter): Observable<DataPage<Document>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', filter.pageNumber.toString());
    httpParams = httpParams.set('pageSize', filter.pageSize.toString());

    if (filter.corpusId) {
      httpParams = httpParams.set('corpusId', filter.corpusId);
    }
    if (filter.author) {
      httpParams = httpParams.set('author', filter.author);
    }
    if (filter.title) {
      httpParams = httpParams.set('title', filter.title);
    }
    if (filter.source) {
      httpParams = httpParams.set('source', filter.source);
    }
    if (filter.profileId) {
      httpParams = httpParams.set('profileId', filter.profileId);
    }
    if (filter.minDateValue) {
      httpParams = httpParams.set(
        'minDateValue',
        filter.minDateValue.toString()
      );
    }
    if (filter.maxDateValue) {
      httpParams = httpParams.set(
        'maxDateValue',
        filter.maxDateValue.toString()
      );
    }
    if (filter.minTimeModified) {
      httpParams = httpParams.set(
        'minTimeModified',
        filter.minTimeModified.toString()
      );
    }
    if (filter.maxTimeModified) {
      httpParams = httpParams.set(
        'maxTimeModified',
        filter.maxTimeModified.toString()
      );
    }
    if (filter.attributes) {
      httpParams = httpParams.set('attributes', filter.attributes);
    }
    if (filter.sort) {
      httpParams = httpParams.set('sort', filter.sort.toString());
    }
    if (filter.descending) {
      httpParams = httpParams.set('descending', filter.descending);
    }

    return this._http
      .get<DataPage<Document>>(this._env.get('apiUrl') + '/documents', {
        params: httpParams,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the document with the specified ID.
   * @param id The document's ID.
   * @returns Oservable with document.
   */
  public getDocument(id: number): Observable<Document> {
    return this._http
      .get<Document>(this._env.get('apiUrl') + '/documents/' + id)
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
