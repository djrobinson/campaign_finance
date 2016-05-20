import {Component, OnChanges, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'inputs-view',
  template: `
    <h1>Inputs here</h1>
    <p>{{inputNode.CMTE_ID}}</p>
  `
})
export class InputsComponent implements OnChanges {
  //Need to think about how to type this input!

  @Input() inputNode;
  constructor(private _TitleService: TitleService) { }

  ngOnChanges(changes: { [inputNode: string]: SimpleChange }) {
    console.log("changing!");
    if (this.inputNode.NAME) {
      this._TitleService.getResult('/api/individuals/transaction/' + this.inputNode.TRAN_ID)
        .subscribe(
        result => { this.results = result },
        error => console.error('Error: ' + err),
        () => { }
        )
    }
  }

  ngOnInit() {
    console.log("we're here!");
  }
}
