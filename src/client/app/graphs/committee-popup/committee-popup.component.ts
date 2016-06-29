import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TreemapComponent} from '../charts/treemap.component';
import {BubbleComponent} from '../charts/bubble-chart.component';

@Component({
  selector: 'committee-popup',
  templateUrl: 'app/graphs/templates/committee-popup.html',
  styles: [`

    .close-button {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 25px;
      width: 25px;
      z-index: 2;
    }

    .close-icon {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 25px;
      width: 25px;
    }

    .cmte-options {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: space-around;
      width: 100%;
    }

    .cmte-option {
      display: flex;
      justify-content: center;
      align-items: center;
      border: #CBCED2;
      color: #CBCED2;
      font-size: 3rem;
      text-align: center;
      flex-grow: 1;
      width: 100%;
    }

    .cmte-option:hover {
      background-color: #16191F;
    }

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
      display: flex;
      flex-grow: 1;
      position: relative;
      height: 100%;
    }

    .committee-container {
      position: relative;
      display: flex;
      height: 100%;
    }
    .outer-table {
      position: relative;
      flex-grow: 1;
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

    .financials {
      color: #cbced2;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: 100%;
      background-color: #17324f;
    }
    table {
      width: 70%;
      margin-left: 15;
      display: block;
      text-align: center;
    }
    td {
      font-size: 1.5rem;
      text-align: center;
      color: #cbced2;
    }
    .green {
      color: #86ca6f;
    }

    .red {
      color: #af3e4d;
    }
    a {
      text-decoration: none;
      color: #cbced2;
    }
    .flexrow {
      display: flex;
      flex-grow: 1;
      height: 50%;
    }
    .flexcontainer {
      display: flex;
      flex-direction: column;
      height: 90%;
    }
  `],
  directives: [TreemapComponent, BubbleComponent]
})
export class CommitteePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() committee: string;
  @Output() exitEmit = new EventEmitter();
  @Output() indivEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() bubbleEmit = new EventEmitter();
  private opex: Object = {};
  private individuals: Object = {};
  private recieveds: Object = {};
  private contributeds: Object = {};
  private route: Object = {};
  private bubble: Object = {};


  constructor(private http: Http) {
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
      this.http.get('/api/opex/committee/' + this.committee).map((res: Response) => res.json()),
      this.http.get('/api/individuals/bubble/'+ this.committee).map((res: Response) => res.json()
      )

    ).subscribe(
      data => {
        console.log(data);
        this.committee = data[0][0];
        data[1] = data[1].map(function(el) {
          el.IMAGE_NUM = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + el.IMAGE_NUM;
          return el;
        })
        this.individuals.data = data[1];
        data[2] = data[2].map(function(el){
          el.IMAGE_NUM = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + el.IMAGE_NUM;
          return el;
        })
        this.contributeds.data = data[2];
        data[3] = data[3].map(function(el) {
          el.IMAGE_NUM = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + el.IMAGE_NUM;
          return el;
        })
        this.recieveds.data = data[3];
        this.opex.data = data[4];
        this.bubble.data = data[5];

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


  showBubbleEmit(cmte){
    console.log(cmte);
    this.bubbleEmit.emit({
      cmte: cmte
    });
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