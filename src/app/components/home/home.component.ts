import { Component, OnInit } from '@angular/core';
import { DocumentReadRequest } from 'projects/myrmidon/pythia-document-reader/src/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public readRequest: DocumentReadRequest | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public onReadRequest(request: DocumentReadRequest): void {
    this.readRequest = request;
  }
}
