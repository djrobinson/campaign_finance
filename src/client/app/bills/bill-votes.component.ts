import {Component, Input} from 'angular2/core';

@Component({
  selector: 'bill-votes',
  template: `

  `,
  styles: [`

  `],
  directives: []
})
export class BillVotesComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() <input>: string;

}