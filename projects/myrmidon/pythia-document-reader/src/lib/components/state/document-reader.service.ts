import { Injectable } from '@angular/core';
import { DocumentService, ReaderService } from '@myrmidon/pythia-api';
import { TextMapNode } from '@myrmidon/pythia-core';
import { take } from 'rxjs/operators';
import { DocumentReadRequest } from '../document-reader/document-reader.component';
import { DocumentReaderStore } from './document-reader.store';

@Injectable({ providedIn: 'root' })
export class DocumentReaderService {
  constructor(
    private _docService: DocumentService,
    private _readService: ReaderService,
    private _store: DocumentReaderStore
  ) {}

  private setNodeParents(node: TextMapNode, parent?: TextMapNode) {
    node.parent = parent;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        this.setNodeParents(node.children[i], node);
      }
    }
  }

  /**
   * Load the requested document with its map.
   *
   * @param request The request.
   */
  public load(request: DocumentReadRequest): void {
    this._store.setError(null);

    // reset text
    this._store.update({ text: '' });

    // load document
    this._docService
      .getDocument(request.documentId)
      .pipe(take(1))
      .subscribe(
        (d) => {
          this._store.update({
            document: d,
          });
        },
        (error) => {
          if (error) {
            console.error(JSON.stringify(error));
          }
          this._store.setError<string>(
            'Unable to load document ' + request.documentId
          );
        }
      );

    // load map
    this._readService
      .getDocumentMap(request.documentId)
      .pipe(take(1))
      .subscribe(
        (node: TextMapNode) => {
          this.setNodeParents(node);
          this._store.update({
            map: node,
          });
        },
        (error) => {
          if (error) {
            console.error(JSON.stringify(error));
          }
          this._store.setError<string>(
            'Unable to load map for document ' + request.documentId
          );
        }
      );

    // load text if required
    if (request.end) {
      this.loadTextFromRange(request.start!, request.end);
    }
  }

  /**
   * Load the text corresponding to the specified path in the document's map.
   * @param path The document's map path.
   * @returns A promise returning true when loading is complete.
   */
  public loadTextFromPath(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._store.setError(null);

      const state = this._store.getValue();
      if (!state.document?.id) {
        reject('No document loaded');
        return;
      }

      this._readService
        .getDocumentPieceFromPath(state.document!.id, path, 2)
        .pipe(take(1))
        .subscribe(
          (piece) => {
            this._store.update({ text: piece.text });
            resolve(true);
          },
          (error) => {
            if (error) {
              console.error(JSON.stringify(error));
            }
            this._store.setError<string>(
              `Unable to load text ${state.document?.id} from ${path}`
            );
            reject('Load error');
          }
        );
    });
  }

  /**
   * Load the specified text range.
   * @param start The start index.
   * @param end The end index (exclusive).
   * @returns A promise returning true when loading is complete.
   */
  public loadTextFromRange(start: number, end: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._store.setError(null);

      const state = this._store.getValue();
      if (!state.document?.id) {
        reject('No document loaded');
        return;
      }

      this._readService
        .getDocumentPieceFromRange(state.document.id, start, end, 2)
        .pipe(take(1))
        .subscribe(
          (piece) => {
            this._store.update({ text: piece.text });
            resolve(true);
          },
          (error) => {
            if (error) {
              console.error(JSON.stringify(error));
            }
            this._store.setError<string>(
              `Unable to load text ${state.document?.id} at ${start}-${end}`
            );
            reject('Load error');
          }
        );
    });
  }
}
