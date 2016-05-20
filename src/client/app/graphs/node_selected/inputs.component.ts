import {Component, OnChanges, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'inputs-view',
  template: `
    <h1>Donor Profile</h1>
    <div *ngIf="result">
      <h3>{{result.NAME}}</h3>
      <h3>{{result.OCCUPATION}}</h3>
      <h3>{{result.EMPLOYER}}</h3>
      <h3>{{result.CITY}}, {{result.STATE}}</h3>
      <h3>{{result.OCCUPATION}}</h3>
      <h3><a [href]="result.IMAGE_NUM">FEC FILING</a></h3>
      <h4>{{result.MEMO_TEXT}}</h4>
    </div>


  `
})
export class InputsComponent implements OnChanges {
  //Need to think about how to type this input!
  result: null;
  @Input() inputNode;
  constructor(private _TitleService: TitleService) { }

  ngOnChanges(changes: { [inputNode: string]: SimpleChange }) {
    if (this.inputNode.NAME) {
      this._TitleService.getResult('/api/individuals/transaction/' + this.inputNode.TRAN_ID)
        .subscribe(
        result => {
          console.log('RESULT', result)
          result[0].IMAGE_NUM = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + result[0].IMAGE_NUM;
          this.result = result[0]
         },
        error => console.error('Error: ' + err),
        () => { }
        )
    }
  }

  ngOnInit() {
    console.log("we're here!");
  }
}
