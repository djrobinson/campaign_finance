import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'candidate-table',
  directives: [CORE_DIRECTIVES],
  template: `   <div class="row twelve-columns text-center">
                  <h5>
                    Click on a candidate to create a Force diagram of all donor connections by candidate.
                  </h5>
                </div>
                <table>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Party</th>
                    <th>Cash on Hand</th>
                    <th>Net Contributions</th>
                    <th>Total Distributions</th>
                    <th>FEC Docs</th>
                  </tr>
                  <tr *ngFor="#candidate of candidates">
                    <td ng-if="graph">
                      <button
                        (click)="buildGraph(candidate.CANDIDATE_ID)"
                      >
                      {{candidate.can_nam}}
                      </button>
                    </td>
                    <td>{{candidate.CANDIDATE_OFFICE}}</td>
                    <td>{{candidate.PARTY}}</td>
                    <td>{{parseFloat(candidate.cas_on_han_clo_of_per) | currency:'USD':true}}</td>
                    <td>{{parseFloat(candidate.net_con) | currency:'USD':true}}</td>
                    <td>{{parseFloat(candidate.tot_dis) | currency:'USD':true}}</td>
                    <td><a [href]="candidate.lin_ima">Link</a></td>
                  </tr>
                </table>
           `,
  providers: [CandidateService],
  styles: [`
    button {
      width: 100%;
    }
    table {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
    .text-center {
      text-align: center;
    }

  `]
})
export class CandidateTableComponent {
  @Input() candidates;
  @Input() graph;
  @Output() buildEmit = new EventEmitter();

  buildGraph(id) {
    this.buildEmit.emit({
      candId: id
    });
  }

  constructor(){
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }


}
