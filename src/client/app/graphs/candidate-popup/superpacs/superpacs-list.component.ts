import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'superpacs-list',
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
        <tr *ngFor="#pac of pacs">
          <td class="cmte-name">
            {{pac.NAME}}
          </td>
          <td>
            {{pac.EMPLOYER}}
          </td>
          <td>
            {{pac.OCCUPATION}}
          </td>
          <td class="green">
            {{parseFloat(pac.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            {{pac.CITY}}, {{pac.STATE}}
          </td>
          <td>
            {{pac.IMAGE_NUM}}
          </td>
          <td>
            {{pac.TRAN_ID}}
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
export class PacsListComponent implements OnInit {
  @Input() cand: any;
  private pacs: any;

  constructor(private http:Http) {}


  public parseFloat = function(num){
    return parseFloat(num);
  }

  ngOnInit(){
    this.http.get('/api/pac/' + this.cand.CANDIDATE_ID + '/candidate').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.pacs = data;
    }, error => console.log('Could not load individuals.'));
  }
}