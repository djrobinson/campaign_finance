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
      position: relative;
      height: 100%;
      font-size: 10px;
    }

    img {
      width: 80%;
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

    pie {
      position: absolute;
      height: 100%;
    }

    treemap {
      position: absolute;
      bottom: 0;
      height: 50%;
      width: 50%;
    }

    .associated-committees {
      position: absolute;
      bottom: 0;
      height: 50%;
      width: 25%;
      left: 50%;
    }

    .cand-pic {
      position: absolute;
      height: 40%;
      width: 25%;
    }

    .pie-chart {
      position: absolute;
      height: 40%;
      width: 25%;
      left: 50%;
      text-align: center;
    }

    pie-chart {
      position: relative;
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

  `]
})
export class CandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Output() exitEmit = new EventEmitter();
  @ViewChild(PieComponent)
  private pieComponent:PieComponent;
  private disbursements: Object;
  private candidateInfo: Object;
  private contributions: Object;
  private imageVar: Object;
  private associatedCommittees: {};


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

  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

}