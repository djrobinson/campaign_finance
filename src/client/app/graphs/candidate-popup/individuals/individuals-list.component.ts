import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'individuals-list',
  template: `

      <table *ngIf="!isMobile">
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
            Location
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
            {{individual.OCCUPATION}}
          </td>
          <td class="green">
            {{parseFloat(individual.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            {{individual.CITY}}, {{individual.STATE}}
          </td>
          <td>
            <img src="images/fec.png" class="fec" (click)="openFec('http://docquery.fec.gov/cgi-bin/fecimg?'+individual?.IMAGE_NUM)" />
          </td>
          <td>
            {{individual.TRAN_ID}}
          </td>
        </tr>
      </table>
      <table *ngIf="isMobile">
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
            Location
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
            {{individual.OCCUPATION}}
          </td>
          <td class="green">
            {{parseFloat(individual.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            {{individual.CITY}}, {{individual.STATE}}
          </td>
          <td>
            <img src="images/fec.png" class="fec" (click)="openFec('http://docquery.fec.gov/cgi-bin/fecimg?'+individual?.IMAGE_NUM)" />
          </td>
          <td>
            {{individual.TRAN_ID}}
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
    .fec {
      height: 3rem;
      width: 3rem;
    }
  `],
  directives: []
})
export class IndividualsListComponent implements OnInit {
  @Input() cmte: string;
  @Input() isMobile: boolean;
  private individuals: any;


  constructor(private http:Http) {}

  public parseFloat = function(num){
    return parseFloat(num);
  }

  ngOnInit(){
    this.http.get('/api/individuals/' + this.cmte + '/recipient').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.individuals = data;
    }, error => console.log('Could not load individuals.'));
  }

  openFec(lin_ima){
    window.open(lin_ima);
  }
}