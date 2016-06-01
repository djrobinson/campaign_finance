import {Component, Input} from 'angular2/core';

@Component({
  selector: 'bill-votes',
  template: `

              <div class="vote-container row">
                <h2>Bill Votes</h2>
                <div *ngFor="#vote of votes">
                  <h5>{{vote.category}}</h5>
                  <h5>{{vote.question}}</h5>
                  <h5>{{vote.result_text}}</h5>
                  <h5>{{vote.source_url}}</h5>
                  <h5>{{vote.requires}}</h5>
                </div>
              </div>
  `,
  styles: [`

  `],
  directives: []
})
export class BillVotesComponent {
  //May want to start creating individual/committee types.
  @Input() votes: string;



}