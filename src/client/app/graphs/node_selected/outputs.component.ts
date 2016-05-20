import {Component, OnInit, OnChanges, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'outputs-view',
  template: `
    <h1>Outputs View</h1>
    <ul *ngFor="#result of results">
      <li>{{result.NAME}} {{result.TRANSACTION_AMT}}</li>
    </ul>

  `
})
export class OutputsComponent implements OnChanges, OnInit{
  //Need to think about how to type this input!
  @Input() outputNode;
  constructor(private _TitleService: TitleService) { }

  ngOnChanges(changes: { [outputNode: string]: SimpleChange }) {
    console.log("changing!");
    if (this.outputNode.NAME) {
      this._TitleService.getResult('/api/individuals?donor=' + this.outputNode.NAME)
        .subscribe(
        result => { this.results = result },
        error => console.error('Error: ' + err),
        () => { }
        )
    }
  }
}
