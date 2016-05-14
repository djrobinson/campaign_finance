import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {GraphService} from '../api_services/graph.service';
@Component({
  selector: 'graph-view',
  template: `
            <div class="row">
              <h1>Haldo!</h1>
              <p>{{result}}</p>
            </div>
           `,
  providers: [GraphService]
})
export class GraphComponent implements OnInit  {
  constructor(private _graphService: GraphService) { }

  ngOnInit() {
    this.getJson();
  }

  getJson() {
    this._graphService.getResult()
      .subscribe(
      result => this.result = result,
      error => console.error('Error: ' + err),
      () => console.log('Completed!')
      );
  }
}