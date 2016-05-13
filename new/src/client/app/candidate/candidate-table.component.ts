import {Component, Input} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
@Component({
  selector: 'candidate-table',
  styles: [

          ],
  template: `
              <h1>Candidate Table Here</h1>
              <div>
                <table>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Candidate ID</th>
                    <th>Party</th>
                    <th>Cash on Hand</th>
                    <th>Net Contributions</th>
                    <th>Total Distributions</th>
                    <th>Operating Expenditures</th>
                    <th>FEC Docs</th>
                  </tr>
                  <tr *ngFor="#candidate of candidates">
                    <td>{{candidate.can_nam}}</td>
                    <td>{{candidate.CANDIDATE_ID}}</td>
                    <td>{{candidate.PARTY}}</td>
                    <td>{{candidate.cas_on_han_clo_of_per}}</td>
                    <td>{{candidate.net_con}}</td>
                    <td>{{candidate.tot_dis}}</td>
                    <td>{{candidate.ope_exp}}</td>
                    <td><a [href]="candidate.lin_ima">Link</a></td>
                  </tr>
                </table>
              </div>
           `,
  providers: [CandidateService],
})
export class CandidateTableComponent {
  @Input() candidates: string;
}