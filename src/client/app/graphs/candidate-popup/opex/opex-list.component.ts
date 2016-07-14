import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'opex-list',
  template: `
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
        <tr *ngFor="#opex of opexes">
          <td class="cmte-name">
            {{opex.NAME}}
          </td>
          <td>
            {{opex.EMPLOYER}}
          </td>
          <td>
            {{opex.OCCUPATION}}
          </td>
          <td class="green">
            {{parseFloat(opex.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            {{opex.CITY}}, {{opex.STATE}}
          </td>
          <td>
            {{opex.IMAGE_NUM}}
          </td>
          <td>
            {{opex.TRAN_ID}}
          </td>
        </tr>
      </table>
  `,
  styles: [`
    h1, h2, h3, h4, h5, p, td, th {
      font-family: 'Oswald';
      font-weight: 300;
    }

    .content {
      position: absolute;
      background-color: #2C3A46;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .cmte-name {
      width: 15%;
    }

    .green {
      color: #86ca6f;
    }

    td {
      text-align: center;
    }
  `],
  directives: []
})
export class OpexListComponent implements OnInit {
  @Input() cmte: string;
  private opexes: any;

  constructor(private http:Http) {}

  ngOnInit(){
    this.http.get('/api/opex/committee/' + this.cmte ).map(response => response.json()).subscribe(data => {
      console.log(data);
      this.opexes = data;
    }, error => console.log('Could not load individuals.'));
  }
}