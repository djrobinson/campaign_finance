import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';


@Component({
  selector: 'superpacs-list',
  template: `
    <div class="indiv-list six columns">
      <p>Other Donations from Similar Names</p>
      <div class="twelve columns other-donations">
        <div *ngFor="#indiv of otherIndividuals?.data"
             class="row donor-tile">
          <div class="one-half column text-center">
            <p>{{indiv?.NAME}}</p>
            <p>{{indiv?.EMPLOYER}}</p>
            <p>{{indiv?.OCCUPATION}}</p>
            <p>{{indiv?.CMTE_ID}}</p>
          </div>
          <div class="one-half column">
            <p>Donation: {{parseFloat(indiv?.TRANSACTION_AMT) | currency:'USD':true}}</p>
            <div class="button" (click)="changeIndiv(indiv?.TRAN_ID)">
              See Donation
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    h1, h2, h3, h4, h5, p, td, th {
      font-family: 'Oswald';
      font-weight: 300;
    }

    .indiv-list {
      position: absolute;
      right: 0;
      height: 75%;
      font-family: 'Prata', serif;
      width: 50%;
      margin-right: 1rem;
      margin-left: 1rem;
      text-align: center;
    }

    .donor-tile:nth-child(2n+1) {
      background-color: #9DBF9E;
    }

    .fec {
      height: 2rem;
    }

    .donor-tile:nth-child(2n) {
      background-color: #f2f2f2;
    }
  `],
  directives: []
})
export class PacsListComponent implements OnInit {
  @Input() indiv: any;

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