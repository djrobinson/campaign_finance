import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';
import {TreemapComponent} from './charts/treemap.component';

@Component({
  selector: 'committee-popup',
  templateUrl: 'app/graphs/templates/committee-popup.html',
  styles: [`
    .indiv {
      text-align: center;
      height: 10%;
    }
    .table-div {
      height: 300px;
      overflow: scroll;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      font-size: 8px;
    }
    .treemap {
      position: relative;
      height: 100%;
    }
    treemap {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .committee-container {
      position: relative;
      height: 90%;
    }
    .top-row-container {
      position: relative;
      height: 50%;
    }
    .bottom-row-container {
      position: relative;
      height: 40%;
    }
    .outer-table {
      position: relative;
      height: 100%;
    }
    .other-donations {
      position: absolute;
      right: 0;
      height: 100%;
      overflow: scroll;
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
    .donor-tile {
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
  `],
  directives: [TreemapComponent]
})
export class CommitteePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() committee: string;
  @Output() exitEmit = new EventEmitter();
  @Output() indivEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  private opex: Object = {};
  private individuals: Object = {};
  private recieveds: Object = {};
  private contributeds: Object = {};
  private route: Object = {};


  constructor(private _TitleService: TitleService,
    private http: Http) {
      this.parseFloat = function(num){
        return parseFloat(num);
      }
    }

  ngOnInit(){
    console.log(this.committee);
    this.callCmteData();
  }

  callCmteData(){
    this.route.data = '/api/opex/aggregate/' + this.committee;
    Observable.forkJoin(
      this.http.get('/api/committees/' + this.committee).map((res: Response) => res.json()),
      this.http.get('/api/individuals/committee/' + this.committee + '/limit').map((res: Response) => res.json()),
      this.http.get('/api/transfers/' + this.committee + '/contributor').map((res: Response) => res.json()),
      this.http.get('/api/transfers/' + this.committee + '/recipient').map((res: Response) => res.json()),
      this.http.get('/api/opex/committee/' + this.committee).map((res: Response) => res.json())

    ).subscribe(
      data => {
        console.log(data);
        this.committee = data[0][0];
        this.individuals.data = data[1];
        this.contributeds.data = data[2];
        this.recieveds.data = data[3];
        this.opex.data = data[4];

      },
      err => console.error(err)
      );
  }

  changeIndiv(indiv) {
    console.log(indiv);
    this.indivEmit.emit({
      transaction: indiv.TRAN_ID,
      name: indiv.NAME
    })
  }

  changeCmte(cmte) {
    console.log(cmte);
    this.committee = cmte;
    this.callCmteData();
  }

  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}