import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';


@Component({
  selector: 'individual-popup-list',
  template: `
    <div class="indiv-list">
      <p>Other Donations from Similar Names</p>
      <div class="other-donations">
        <spinner [isRunning]="isRequesting">
        </spinner>
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
      bottom: 0;
      width: 80%;
      height: 80%;
      font-family: 'Prata', serif;
      text-align: center;
      overflow: scroll;
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
  directives: [SpinnerComponent]
})
export class IndividualListPopupComponent implements OnInit {
  @Input() indivName: string;
  public otherIndividuals: any;
  public isRequesting: boolean=true;

  constructor(private http:Http) {}


  public parseFloat(num){
    return parseFloat(num);
  }

  ngOnInit() {
    Observable.forkJoin(
      this.http.get('/api/individuals?donor=' + this.indivName).map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log("For Individuals list: ", data);
        this.isRequesting = false;
        this.otherIndividuals = {};
        this.otherIndividuals.data = data[0];
      },
      err => console.error(err)
      );
  }
}