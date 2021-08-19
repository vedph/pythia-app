import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '@myrmidon/pythia-core';

@Component({
  selector: 'pythia-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.css'],
})
export class DocumentInfoComponent implements OnInit {
  @Input()
  public document: Document | undefined;
  @Output() readRequest: EventEmitter<Document>;

  constructor() {
    this.readRequest = new EventEmitter<Document>();
  }

  ngOnInit(): void {}

  public read(): void {
    this.readRequest.emit(this.document);
  }
}
