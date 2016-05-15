import {Component, Input} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'disbursements-table',
  styles: [

  ],
  template: `
                <table>
                  <tr>
                    <th>Committee ID</th>
                    <th>Committee Name</th>
                    <th>Candidate ID</th>
                    <th>Candidate Name</th>
                    <th>Recipient Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>

                  </tr>
                  <tr *ngFor="#disbursement of disbursements">
                    <td>{{disbursement.com_id}}</td>
                    <td>{{disbursement.com_nam}}</td>
                    <td>{{disbursement.can_id}}</td>
                    <td>{{disbursement.can_nam}}</td>
                    <td>{{disbursement.rec_nam}}</td>
                    <td>{{disbursement.dis_dat}}</td>
                    <td>{{disbursement.dis_amo}}</td>
                    <td>{{disbursement.dis_pur_des}}</td>
                  </tr>
                </table>
           `,
  providers: [TitleService]
})
export class DisbursementTableComponent {
  @Input() disbursements: string;
}