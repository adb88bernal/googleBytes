import { Component, OnInit, Input } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.css']
})
export class ListResultsComponent implements OnInit {
  @Input() resultsArray;
  @Input() service: any;

  constructor() {
    
   }

  ngOnInit() {

  }

  
}
