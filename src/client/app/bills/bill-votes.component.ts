import {Component, Input} from 'angular2/core';

@Component({
  selector: 'bill-votes',
  template: `

              <div class="vote-container row">
                <h2>Bill Votes</h2>
                <div *ngFor="#vote of votes" class="vote">
                  <h3>{{vote.subject}}</h3>
                  <div class="row">
                    <div class="one-half column">
                      <h5>{{vote.question}}</h5>
                    </div>
                    <div class="one-half column">
                      <h5>Category: {{vote.category}} Requires: {{vote.requires}}</h5>
                    </div>
                  </div>
                  <h5>{{vote.result_text}}</h5>
                  <h5><a [href]="vote.source_url">Roll Call Link</a></h5>
                </div>
              </div>
  `,
  styles: [`
    .vote-container {
      text-align: center;

    }
    .vote {
      border: solid 1px gray;
    }
  `],
  directives: []
})
export class BillVotesComponent {
  //May want to start creating individual/committee types.
  @Input() votes: string;



}