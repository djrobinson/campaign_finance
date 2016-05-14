import {Component, Input} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'opex-table',
  styles: [

  ],
  template: `
              <h1>Opex Table Here</h1>
              <div>
                <table>
                  <tr>
                    <th>Committee ID</th>
                    <th>Opex Name</th>
                    <th>Individual State</th>
                    <th>Purpose</th>
                    <th>Transaction Amount</th>
                    <th>Memo Text</th>
                  </tr>
                  <tr *ngFor="#op of opex">
                    <td>{{op.CMTE_ID}}</td>
                    <td>{{op.NAME}}</td>
                    <td>{{op.STATE}}</td>
                    <td>{{op.PURPOSE}}</td>
                    <td>{{op.TRANSACTION_AMT}}</td>
                    <td>{{op.MEMO_TEXT}}</td>
                  </tr>
                </table>
              </div>
           `,
  providers: [TitleService],
})
export class OpexTableComponent {
  @Input() opex: string;
}