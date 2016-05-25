import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'committee-popup',
  template: `
    <div class="row">
      <div class="four columns">
        <div class="table-div">
          <ul *ngFor="#individual of individuals?.data">
            <li>{{individual.NAME}} {{individual.TRANSACTION_AMT}}</li>
          </ul>
        </div>
        <div class="table-div">
          <ul *ngFor="#reciept of recieveds?.data">
            <li>{{reciept}}</li>
          </ul>
        </div>
      </div>
      <div class="four columns">
        <h4>Committee Financials</h4>
        <h5>{{committee?.COMMITEE_EMAIL}}</h5>
        <h5>{{committee?.net_con}}</h5>
      </div>
      <div class="four columns">
        <div class="table-div">
          <ul *ngFor="#exp of opex?.data">
            <li>{{exp.NAME}}</li>
          </ul>
        </div>
        <div class="table-div">
          <ul *ngFor="#contrib of contributeds?.data">
            <li>{{contrib}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row indiv twelve columns">
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }
    .table-div {
      height: 300px;
      overflow: scroll;
    }
        div {
      border: solid 1px #75717B;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      font-size: 8px;
    }
  `]
})
export class CommitteePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() committee: string;
  @Output() exitEmit = new EventEmitter();
  private committee: Observable<Object>;
  private opex = {};
  private individuals = {};
  private recieveds = {};
  private contributeds = {};


  constructor(private _TitleService: TitleService,
    private http: Http) { }

  ngOnInit(){
    console.log(this.committee);
    Observable.forkJoin(
      this.http.get('/api/committees/'+this.committee).map((res: Response) => res.json()),
      this.http.get('/api/individuals/committee/'+this.committee).map((res: Response) => res.json()),
      this.http.get('/api/transfers/'+this.committee+'/contributor').map((res: Response) => res.json()),
      this.http.get('/api/transfers/'+this.committee+'/recipient').map((res: Response) => res.json()),
      this.http.get('/api/opex/committee/'+this.committee).map((res: Response) => res.json())

    ).subscribe(
      data => {
        console.log(data);
        this.committee = data[0][0];
        this.opex.data = data[4];
        this.individuals.data = data[1];
        this.recieveds.data = data[3];
        this.contributeds.data = data[2];
      },
      err => console.error(err)
      );
  }

  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}