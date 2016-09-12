import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'superpacs-list',
  template: `
    <table *ngIf="!isMobile">
        <tr>
          <th>
            Superpac
          </th>
          <th>
            Amount
          </th>
          <th>
            Recipient
          </th>
          <th>
            Support/Oppose
          </th>
          <th>
            Purpose
          </th>
          <th>
            Date
          </th>
          <th>
            FEC File
          </th>
          <th>
            Committee Link
          </th>
        </tr>
        <tr *ngFor="#pac of pacs">
          <td class="cmte-name">
            {{pac.spe_nam}}
          </td>
          <td class="green">
            {{parseFloat(pac.exp_amo) | currency:'USD':true}}
          </td>
          <td>
            {{pac.pay}}
          </td>
          <td>
            {{pac.sup_opp}}
          </td>
          <td>
            {{pac.pur}}
          </td>
          <td>
            {{pac.rec_dat}}
          </td>
          <td>
            <a [href]="'http://docquery.fec.gov/cgi-bin/fecimg?'+pac?.ima_num"><img src="images/fec.png" class="fec" /></a>
          </td>
          <td>
            {{pac.spe_id}}
          </td>
        </tr>
      </table>
      <table *ngIf="isMobile">
        <tr>
          <th class="mobile">
            Superpac
          </th>
          <th class="mobile">
            Amount
          </th>
          <th class="mobile">
            Recipient
          </th>
          <th class="mobile">
            FEC File
          </th>
        </tr>
        <tr *ngFor="#pac of pacs">
          <td class="cmte-name mobile">
            {{pac.spe_nam}}
          </td>
          <td [style.color]="(pac.sup_opp === 'Support') ? 'green' : 'red'" class="mobile">
            {{parseFloat(pac.exp_amo) | currency:'USD':true}}
          </td>
          <td class="mobile">
            {{pac.pay}}
          </td>
          <td>
            <a [href]="'http://docquery.fec.gov/cgi-bin/fecimg?'+pac?.ima_num"><img src="images/fec.png" class="fec" /></a>
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
      font-size: 3rem;
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
export class PacsListComponent implements OnInit {
  @Input() cand: any;
  @Input() isMobile: boolean;
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