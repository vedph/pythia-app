import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ReaderService } from '@myrmidon/pythia-api';
import { Document, TextMapNode } from '@myrmidon/pythia-core';
import { Observable, of } from 'rxjs';
import { DocumentReaderQuery } from '../state/document-reader.query';
import { DocumentReaderService } from '../state/document-reader.service';

export interface DocumentReadRequest {
  documentId: number;
  start?: number;
  end?: number;
}

@Component({
  selector: 'pythia-document-reader',
  templateUrl: './document-reader.component.html',
  styleUrls: ['./document-reader.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentReaderComponent implements OnInit {
  private _busy: boolean | undefined;
  private _request: DocumentReadRequest | undefined;

  @Input()
  public get request(): DocumentReadRequest | undefined {
    return this._request;
  }
  public set request(value: DocumentReadRequest | undefined) {
    if (
      this._request &&
      value &&
      this._request.documentId === value.documentId &&
      this._request.start === value.start &&
      this._request.end === value.end
    ) {
      return;
    }
    this._request = value;
    if (value) {
      this._drService.load(value);
    } else {
      this._drService.reset();
    }
  }

  public loading$: Observable<boolean>;
  public document$: Observable<Document | undefined>;
  public map$: Observable<TextMapNode | undefined>;
  public text$: Observable<string | undefined>;

  public treeControl: NestedTreeControl<TextMapNode>;
  public treeDataSource: MatTreeNestedDataSource<TextMapNode>;

  constructor(
    drQuery: DocumentReaderQuery,
    private _drService: DocumentReaderService,
    private _readerService: ReaderService
  ) {
    this.loading$ = drQuery.selectLoading();
    this.document$ = drQuery.selectDocument();
    this.map$ = drQuery.selectMap();
    this.text$ = drQuery.selectText();
    // map
    this.treeControl = new NestedTreeControl((n: TextMapNode) => {
      return of(n.children || []);
    });
    this.treeDataSource = new MatTreeNestedDataSource();
    this.map$.subscribe((root) => {
      this.treeDataSource.data = root ? [root] : [];
    });
  }

  public hasNestedChild = (index: number, node: TextMapNode) => {
    return node.children && node.children?.length > 0;
  };

  ngOnInit(): void {}

  public onMapNodeClick(node: TextMapNode): void {
    if (this._busy) {
      return;
    }
    this._busy = true;
    const path = this._readerService.getNodePath(node);
    this._drService.loadTextFromPath(path).finally(() => {
      this._busy = false;
    });
  }
}
