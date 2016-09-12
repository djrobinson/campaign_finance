import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'opex-list',
  template: `
    <table *ngIf="!isMobile">
        <tr>
          <th>
            Name
          </th>
          <th>
            Purpose
          </th>
          <th>
            Transaction Amount
          </th>
          <th>
            Date
          </th>
          <th>
            FEC File
          </th>
        </tr>
        <tr *ngFor="#opex of opexes">
          <td class="cmte-name">
            {{opex.NAME}}
          </td>
          <td>
            {{opex.PURPOSE}}
          </td>
          <td class="green">
            {{parseFloat(opex.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            {{opex.TRANSACTION_DT}}
          </td>
          <td>
            <a [href]="'http://docquery.fec.gov/cgi-bin/fecimg?'+opex?.IMAGE_NUM"><img src="images/fec.png" class="fec" /></a>
          </td>
        </tr>
      </table>
      <table *ngIf="isMobile" class="mobile">
        <tr>
          <th class="mobile">
            Name
          </th>
          <th  class="mobile">
            Purpose
          </th>
          <th class="mobile">
            Transaction Amount
          </th>
          <th class="mobile">
            FEC File
          </th>
        </tr>
        <tr *ngFor="#opex of opexes">
          <td class="mobile" >
            {{opex.NAME}}
          </td>
          <td  class="mobile">
            {{opex.PURPOSE}}
          </td>
          <td class="green mobile">
            {{parseFloat(opex.TRANSACTION_AMT) | currency:'USD':true}}
          </td>
          <td>
            <a [href]="'http://docquery.fec.gov/cgi-bin/fecimg?'+opex?.IMAGE_NUM"><img src="images/fec.png" class="fec" /></a>
          </td>
        </tr>
      </table>
  `,
  styles: [`
    h1, h2, h3, h4, h5, p, td, th {
      font-family: 'Oswald';
      font-weight: 300;
    }

    .mobile {
      font-size: 4rem;
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
    .fec {
      height: 7rem;
      width: 7rem;
    }
  `],
  directives: []
})
export class OpexListComponent implements OnInit {
  @Input() cmte: string;
  @Input() isMobile: boolean;
  private opexes: any;

  constructor(private http:Http) {}

  public parseFloat = function(num){
    return parseFloat(num);
  }

  ngOnInit(){
    this.http.get('/api/opex/committee/' + this.cmte ).map(response => response.json()).subscribe(data => {
      console.log(data);
      this.opexes = data;
    }, error => console.log('Could not load individuals.'));
  }
}