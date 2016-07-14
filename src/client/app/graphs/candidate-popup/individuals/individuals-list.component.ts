import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'individuals-list',
  template: `
    <div class="content">
      <h1>Individuals</h1>
      <table>
        <tr>
          <th>
            Name
          </th>
          <th>
            Employer
          </th>
          <th>
            Title
          </th>
          <th>
            Transaction Amount
          </th>
          <th>
            Memo Text
          </th>
          <th>
            FEC File
          </th>
          <th>
            Committe Link
          </th>
        </tr>
        <tr *ngFor="#individual of individuals">
          <td class="cmte-name">
            {{individual.NAME}}
          </td>
          <td>
            {{individual.EMPLOYER}}
          </td>
          <td>
            {{individual.TITLE}
          </td>
          <td class="green">
            {{parseFloat(individual.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            {{individual.CITY}}, {{individual.STATE}}
          </td>
          <td>
            {{individual.IMAGE_NUM}}
          </td>
          <td>
            {{individual.CMTE_ID}}
          </td>
        </tr>
      </table>
    </div>
  `,
  styles: [`
    width: 100%;
    height; 100%;
  `],
  directives: []
})
export class IndividualsListComponent implements OnInit {
  @Input() cmte: string;
  private individuals: any;


  constructor(private http:Http) {}

  ngOnInit(){
    this.http.get('/api/individuals/' + this.cmte + '/recipient').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.individuals = data;
    }, error => console.log('Could not load individuals.'));
  }
}