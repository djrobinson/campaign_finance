import {Component, Input} from 'angular2/core';
@Component({
  selector: 'associated-table',
  template: `
              <h1>Associated Committees</h1>
              <div>
                <table>
                  <tr>
                    <th>Candiate ID</th>
                    <th>Election Year</th>
                    <th>Committee ID</th>
                    <th>Committee Type</th>
                    <th>Linkage ID</th>
                  </tr>
                  <tr *ngFor="#candidate of candidates">
                    <td>{{candidate.CAND_ID}}</td>
                    <td>{{candidate.CAND_ELECTION_YR}}</td>
                    <td>{{candidate.CMTE_ID}}</td>
                    <td>{{candidate.CMTE_TP}}</td>
                    <td>{{candidate.LINKAGE_ID}}</td>
                  </tr>
                </table>
              </div>
           `
})
export class AssociatedTableComponent {
  @Input() candidates: string;
}