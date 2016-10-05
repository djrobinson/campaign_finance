import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';
import {Router} from 'angular2/router';


@Component({
  selector: 'individual-popup-list',
  template: `

    <spinner *ngIf="isRequesting" [isRunning]="isRequesting">
    </spinner>
    <div class="title">
      <h5>Other Donations from Similar Names</h5>
    </div>
    <div class="indiv-list">


        <div *ngFor="#indiv of otherIndividuals?.data"
             class="row donor-tile">
          <div class="one-half column text-center">
            <h4>{{indiv?.NAME}}</h4>
            <p>{{indiv?.EMPLOYER}}</p>
            <p>{{indiv?.CMTE_NM}}</p>
          </div>
          <div class="one-half column">
            <p>Donation: {{parseFloat(indiv?.TRANSACTION_AMT) | currency:'USD':true}}</p>
            <div class="button" (click)="changeTran(indiv, isMobile)">
              See Donation
            </div>
          </div>
        </div>
    </div>
  `,
  styles: [`
    h1, h2, h3, h4, p, td, th {
      font-family: 'Oswald';
      font-weight: 300;
    }

    h4 {
      font-family: 'Oswald';
      font-weight: 500;
      font-size: 1.5rem;
      padding-top: 1rem;
    }

    .title h5 {
      font-family: 'Oswald';
      font-weight: 500;
    }

    .indiv-list {
      display: block
      width: 100%;
      height: 80%;
      text-align: center;
      overflow: scroll;
      padding: 2rem;

      border: solid 2px #75717B;
    }

    spinner {
      background-color: #FCFCFC;
      padding-top: 58%;
      position:absolute;
      height: 77%;
      width: 100%;
    }

    .fec {
      height: 2rem;
    }

    .donor-tile {
      border-bottom: solid 2px #f2f2f2;
    }

    .title {
      padding-top: 2rem;
      display: block;
      height: 10%;
      width: 100%;
      text-align: center;
    }
    .title h5 {
      font-weight: 500;

    }
    .button {
      font-family: 'Oswald';
      background-color: #73877B; /* Green */
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      cursor: pointer;
      background-color: white;
      color: black;
      border: 2px solid #9DBF9E;
      border-radius: 25px;
      box-sizing: border-box;;
      width: 80%;
    }

    .button:hover {
        background-color: #9DBF9E;
        color: white;
    }
  `],
  directives: [SpinnerComponent]
})
export class IndividualListPopupComponent implements OnInit {
  @Input() indivName: string;
  @Input() isMobile: boolean;
  @Input() donationList: any;
  @Output() tranEmit = new EventEmitter();
  public otherIndividuals: any;
  public isRequesting: boolean=true;

  constructor(private http:Http, private router:Router) {}


  public parseFloat(num){
    return parseFloat(num);
  }

  ngOnInit() {

    // this.otherIndividuals.data = this.donationList;

    console.log("Indiv Name at the start: ", this.indivName);
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

  changeTran(indiv, isMobile) {
      if (!isMobile){
        this.tranEmit.emit({
          transaction: indiv.TRAN_ID,
          name: indiv.NAME
        })
      } else {
        this.router.navigate(['MobileIndividualPopupComponent', { transaction: indiv.TRAN_ID } ]);
      }
      console.log("Calling the changeIndiv func");

  }

  changeTranMobile(tran){

  }
}