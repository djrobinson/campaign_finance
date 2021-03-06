import {Component, Input} from 'angular2/core';
@Component({
  selector: 'committee-table',
  styles: [

  ],
  template: `
                <table>
                  <tr>
                    <th>Committee Name</th>
                    <th>Committee ID</th>
                    <th>Committee State</th>
                    <th>Total Receipts</th>
                    <th>Operating Expenditures</th>
                    <th>Net Contributions</th>
                  </tr>
                  <tr *ngFor="#committee of committees">
                    <td>{{committee.COMMITTEE_NAME}}</td>
                    <td>{{committee.COMMITTEE_ID}}</td>
                    <td>{{committee.COMMITTEE_STATE}}</td>
                    <td>{{committee.tot_rec}}</td>
                    <td>{{committee.ope_exp}}</td>
                    <td>{{committee.net_con}}</td>
                    <td><a [href]="committee.lin_ima">Link</a></td>

                  </tr>
                </table>
           `
})
export class CommitteeTableComponent {
  @Input() committees: string;
}