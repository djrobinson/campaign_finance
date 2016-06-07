import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';
import {TreemapComponent} from './charts/treemap.component';
import {PieComponent} from './charts/pie-chart.component';


@Component({
  selector: 'candidate-popup',
  templateUrl: 'app/graphs/templates/candidate-popup.html',
  directives: [TreemapComponent, PieComponent],
  styles: [`
    .cand-style {
      display: flex;
      height: 100%;
      font-size: 10px;
    }

    .green {
      color: #86ca6f;
    }

    .red {
      color: #af3e4d;
    }


    .close-button {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 25px;
      width: 25px;
    }

    .close-icon {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 25px;
      width: 25px;
    }

    img {
      width: 60%;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }

    li {
      font-size: 8px;
    }
    .table-div {
      height: 600px;
      overflow: scroll;
    }

    .choices {
      background-color: #17324f;
      color: #cbced2;
      text-align: center;
      height: 100%;
      display: flex;
      flex-direction: column;

    }

    .cand-pic {
      flex-grow: 1;
    }

    .cand-options {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: space-around;
    }

    .cand-option {
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

    .cand-option:hover {
      background-color: #16191F;
    }

    .outerrow {
      display: flex;
      height: 100%;
      flex-direction: column;
    }

    .flexrow {
      display: flex;
      flex-grow: 1;
      height: 50%;
    }

    .flexyrow {
      display: flex;
      flex-grow: 1;
    }

    pie-chart {
      position: relative;
      flex-grow: 1;
    }

    treemap {
      position:relative;
      flex-grow: 2;
    }

    table {
      font-size: 1rem;
    }

    .main-info {
      position: absolute;
      height: 40%;
      width: 25%;
      left: 25%;
    }

    .pac-spend {
      position: absolute;
      right: 0;
      width: 25%;
      height: 90%;
    }

    .indiv {
      position: absolute;
      text-align: right;
      width: 100%;
      height: 5%;
      bottom: 0;
    }

    .assoc-container {
      position: relative;
      padding: 0 !important;
      margin: 0 !important;
      height: 100%;
      width: 100%;
      overflow: scroll;
    }

    .assoc-tile {
      position: absolute;
      padding: 0 !important;
      margin: 0 !important;
      vertical-align: top;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      border: solid 1px gray;
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

    .cand-table {
      width: 100%;
    }

    .finances {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .finance-title {
      display: block;
      width: 100%;
      text-align: center;
    }

    td {
      font-size: 2rem;
    }

  `]
})
export class CandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Output() exitEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() treemapEmit = new EventEmitter();
  @ViewChild(PieComponent) pieComponent: PieComponent;
  @ViewChild(TreemapComponent) treemapComponent: TreemapComponent;

  private disbursements: Object;
  private candidateInfo: Object;
  private contributions: Object;
  private imageVar: Object;
  private associatedCommittees: Object = {};
  private pacSpends: Object;
  private route: string;

  constructor(private _TitleService: TitleService,
              private http: Http) {

    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
      this.imageVar = {};
      this.imageVar.image = "https://raw.githubusercontent.com/djrobinson/campaign_finance/master/candidates/"+ this.candidate + ".jpg";
      this.callPresApis(this.candidate)

  }


  callPresApis(fecId){
    this.route = '/api/pac/aggregate/' + fecId;
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/associated').map((res: Response) => res.json()),
      this.http.get('/api/pac/'+fecId+'/candidate').map((res: Response) => res.json()),

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        data[2] = data[2].map(function(el){
          el.IMAGE_NUM = "http://docquery.fec.gov/cgi-bin/fecimg/?" + el.IMAGE_NUM;
          return el;
        })
        this.contributions = data[2];
        this.associatedCommittees = data[3][0];
        this.pacSpends = data[4];
        this.pieComponent.callAsc(data[3][0]);

      },
      err => console.error(err)
    );
  }

  showTreemapEmit(route){
    console.log(route);
    this.treemapEmit.emit({
      route: route
    })
  }

  cmtePopupEmit(cmte) {
    console.log(cmte);
    this.cmteEmit.emit({
      cmte: cmte
    })
  }

  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

}