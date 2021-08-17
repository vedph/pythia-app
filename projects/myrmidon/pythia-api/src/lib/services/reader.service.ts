import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService, EnvService, TextMapNode } from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  /**
   * Get the contents map of the specified document.
   * @param id The document's ID.
   * @returns Map's root node.
   */
  public getDocumentMap(id: number): Observable<TextMapNode> {
    return this._http
      .get<TextMapNode>(this._env.get('apiUrl') + 'documents/' + id + '/map')
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the text of the specified document.
   * @param id The document's ID.
   * @returns Text.
   */
  public getDocumentText(id: number): Observable<string> {
    return this._http
      .get<string>(this._env.get('apiUrl') + 'documents/' + id + '/text')
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the specified document piece from its path.
   * @param id The document's ID.
   * @param path The path.
   * @param parts The output document parts to render: header=1, body=2,
   * footer=4. You can combine these bit-values as desired.
   * @returns Piece.
   */
  public getDocumentPieceFromPath(
    id: number,
    path: string,
    parts: number
  ): Observable<{ text: string }> {
    let httpParams = new HttpParams();
    if (parts) {
      httpParams = httpParams.set('parts', parts.toString());
    }

    return this._http
      .get<{ text: string }>(
        this._env.get('apiUrl') + 'documents/' + id + '/path/' + path,
        {
          params: httpParams,
        }
      )
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the specified document piece from a range of locations.
   * @param id The document's ID.
   * @param start The range start.
   * @param end The range end (exclusive).
   * @param parts The output document parts to render: header=1, body=2,
   * footer=4. You can combine these bit-values as desired.
   * @returns Piece.
   */
  public getDocumentPieceFromRange(
    id: number,
    start: number,
    end: number,
    parts: number
  ): Observable<{ text: string }> {
    let httpParams = new HttpParams();
    if (parts) {
      httpParams = httpParams.set('parts', parts.toString());
    }

    return this._http
      .get<{ text: string }>(
        this._env.get('apiUrl') +
          'documents/' +
          id +
          '/range/' +
          start +
          '/' +
          end,
        {
          params: httpParams,
        }
      )
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
