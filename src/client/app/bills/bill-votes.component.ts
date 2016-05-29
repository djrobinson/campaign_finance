import {Component, Input} from 'angular2/core';

@Component({
  selector: 'bill-votes',
  template: `
                <h2>Bill Votes</h2>
                <h5>{{votes.category}}</h5>
                <h5>{{votes.question}}</h5>
                <h5>{{votes.result_text}}</h5>
                <h5>{{votes.source_url}}</h5>
                <h5>{{votes.requires}}</h5>
  `,
  styles: [`

  `],
  directives: []
})
export class BillVotesComponent {
  //May want to start creating individual/committee types.
  @Input() votes: string;



}