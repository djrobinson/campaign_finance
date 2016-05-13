import {Component, Input} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'contributions-table',
  styles: [

  ],
  template: `
              <h1>Committee Expenditures Table Here</h1>
              <div>
                <table>
                  <tr>
                    <th>Committee ID</th>
                    <th>Recipient</th>
                    <th>Recipient State</th>
                    <th>Transaction Amount</th>
                    <th>Associated Candidate</th>

                  </tr>
                  <tr *ngFor="#contribution of contributions">
                    <td>{{contribution.CMTE_ID}}</td>
                    <td>{{contribution.NAME}}</td>
                    <td>{{contribution.STATE}}</td>
                    <td>{{contribution.TRANSACTION_AMT}}</td>
                    <td>{{contribution.CAND_ID}}</td>


                  </tr>
                </table>
              </div>
           `,
  providers: [TitleService],
})
export class ContributionTableComponent {
  @Input() contributions: string;
}