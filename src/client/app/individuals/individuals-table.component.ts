import {Component, Input} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'individuals-table',
  styles: [

  ],
  template: `
                <table>
                  <tr>
                    <th>Committee ID</th>
                    <th>Individual Name</th>
                    <th>Individual State</th>
                    <th>Individual Employer</th>
                    <th>Transaction Amount</th>
                    <th>Memo Text</th>
                  </tr>
                  <tr *ngFor="#individual of individuals">
                    <td>{{individual.CMTE_ID}}</td>
                    <td>{{individual.NAME}}</td>
                    <td>{{individual.STATE}}</td>
                    <td>{{individual.EMPLOYER}}</td>
                    <td>{{individual.TRANSACTION_AMT}}</td>
                    <td>{{individual.MEMO_TEXT}}</td>
                  </tr>
                </table>
           `,
  providers: [TitleService],
})
export class IndividualsTableComponent {
  @Input() individuals: string;
}