import {Component, Input} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'pacs-table',
  styles: [

  ],
  template: `
                <table>
                  <tr>
                    <th>Committee Name</th>
                    <th>PAC ID</th>
                    <th>PAC Name</th>
                    <th>Expenditure Amt</th>
                    <th>Date</th>
                    <th>Support/Oppose</th>
                    <th>Purpose</th>
                    <th>Recipient</th>
                  </tr>
                  <tr *ngFor="#pac of pacs">
                    <td>{{pac.can_nam}}</td>
                    <td>{{pac.spe_id}}</td>
                    <td>{{pac.spe_nam}}</td>
                    <td>{{pac.exp_amo}}</td>
                    <td>{{pac.exp_dat}}</td>
                    <td>{{pac.sup_opp}}</td>
                    <td>{{pac.pur}}</td>
                    <td>{{pac.pay}}</td>

                  </tr>
                </table>
           `,
  providers: [TitleService],
})
export class PacsTableComponent {
  @Input() pacs: string;
}