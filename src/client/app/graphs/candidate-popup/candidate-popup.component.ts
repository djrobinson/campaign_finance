import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TreemapComponent} from '../charts/treemap.component';
import {TypePieComponent} from '../charts/type-pie-chart.component';
import {SizePieComponent} from '../charts/size-pie-chart.component';
import {DsgnPieComponent} from '../charts/dsgn-pie-chart.component';
import {BarComponent} from '../charts/bar-chart.component';
import {OpexSectionComponent} from './opex/opex.component';
import {SuperpacsSectionComponent} from './superpacs/superpacs.component';
import {IndividualsSectionComponent} from './individuals/individuals.component';
import {CommitteesSectionComponent} from './committees/committees.component';
import {SpinnerComponent} from '../../loading/spinner.component';

@Component({
  selector: 'candidate-popup',
  templateUrl: 'app/graphs/candidate-popup/candidate-popup.html',
  styleUrls: ['app/graphs/candidate-popup/candidate-popup.css'],
  directives: [TypePieComponent, SizePieComponent, DsgnPieComponent, BarComponent, OpexSectionComponent, SuperpacsSectionComponent, CommitteesSectionComponent, IndividualsSectionComponent, SpinnerComponent]
})
export class CandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Input() committee: string;
  @Input() isCandidate: boolean;
  @Output() exitEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @ViewChild(TypePieComponent) typePieComponent: TypePieComponent;
  @ViewChild(SizePieComponent) sizePieComponent: SizePieComponent;
  @ViewChild(DsgnPieComponent) dsgnPieComponent: DsgnPieComponent;
  @ViewChild(BarComponent) barComponent: BarComponent;

  private disbursements: Object;
  private candidateInfo: Object;
  private contributions: Object;
  private imageVar: Object;
  private associatedCommittees: Object = {};
  private pacSpends: Object;
  private route: string;
  private typeString: string;
  private isRequesting: boolean;
  public itemizedDonations: number;
  public committeeDonations: number;
  public barChartData: any;
  public selection: string;
  public primaryCmte: any;
  public pacSupport: any;
  public pacOppose: any;

  constructor(
    private http: Http) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
      this.isRequesting = true;
      this.imageVar = {};
      this.selection = "main";
      if (this.isCandidate === true && this.candidate.charAt(0) === "P") {
        // this.route = '/api/pac/aggregate/' + this.candidate;
        this.imageVar.image = "https://raw.githubusercontent.com/djrobinson/campaign_finance/master/candidates/" + this.candidate + ".jpg";
        this.typeString = "Superpac";
      } else {
        // this.route = '/api/disbursements/graph/' + this.candidate;
        this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
          this.candidateInfo = data[0];
          this.imageVar = {};
          this.imageVar.image = "https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/" + this.candidateInfo.id.bioguide + ".jpg";
          this.typeString = "candidate disbursement";
        }, error => console.log('Could not load candidate info.'));
      }
      if (this.isCandidate === true){
        this.callPresApis(this.candidate)
      } else {
        this.callCmteApis(this.committee);
      }
  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  public callPresApis(fecId){
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId)
        .map((res: Response) => res.json()), //0 Needed
      this.http.get('/api/candidates/'+fecId+'/associated')
        .map((res: Response) => res.json()), //3 Needed
      this.http.get('api/transfers/'+this.committee+'/designation')
        .map((res: Response) => res.json()), //5
      this.http.get('api/transfers/'+this.committee+'/cmtetype')
        .map((res: Response) => res.json()), //6
      this.http.get('/api/individuals/committee/'+this.committee+'/pie')
        .map((res: Response) => res.json()), //7
      this.http.get('/api/individuals/committee/'+this.committee+'/date')
        .map((res: Response) => res.json()), //8
      this.http.get('/api/transfers/'+this.committee+'/date')
        .map((res: Response) => res.json()), //9
      this.http.get('/api/pac/'+fecId+'/support/sum')
        .map((res: Response) => res.json()), //10
      this.http.get('/api/pac/'+fecId+'/oppose/sum')
        .map((res: Response) => res.json()) //11
    ).subscribe(
      data => {
        console.log("All candidate data: ", data);
        this.candidate = data[0][0];
        this.primaryCmte = data[1].filter((cmte)=>{
          if(cmte.CMTE_DSGN === "P"){
            return cmte
          };
        })[0];
        this.typePieComponent.callAsc(data[3]);
        this.sizePieComponent.callAsc(data[4]);
        this.dsgnPieComponent.callAsc(data[2]);

        this.itemizedDonations = parseInt(data[4][0].count);
        this.committeeDonations = data[3].reduce((prev, item)=>{
          return prev + +item.count;
        }, 0)

        this.pacSupport = parseInt(data[7][0].total);
        this.pacOppose = parseInt(data[8][0].total);

        var barChartData = data[5].concat(data[6]);
        this.barComponent.buildChart(barChartData);
        this.stopRefreshing();
      },
      err => console.error(err)
    );
  }

  public callCmteApis(cmte){
    Observable.forkJoin(
      this.http.get('/api/committees/'+cmte)
        .map((res: Response) => res.json()),
      this.http.get('api/transfers/'+cmte+'/designation')
        .map((res: Response) => res.json()),
      this.http.get('api/transfers/'+cmte+'/cmtetype')
        .map((res: Response) => res.json()),
      this.http.get('/api/individuals/committee/'+cmte+'/pie')
        .map((res: Response) => res.json()),
      this.http.get('/api/individuals/committee/'+cmte+'/date')
        .map((res: Response) => res.json()),
      this.http.get('/api/transfers/'+cmte+'/date')
        .map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log("All committee data: ", data);
        this.candidate = data[0][0];
        this.typePieComponent.callAsc(data[2]);
        this.sizePieComponent.callAsc(data[3]);
        this.dsgnPieComponent.callAsc(data[1]);

        this.itemizedDonations = parseInt(data[3][0].count);
        this.committeeDonations = data[2].reduce((prev, item)=>{
          return prev + +item.count;
        }, 0)

        var barChartData = data[4].concat(data[5]);
        this.barComponent.buildChart(barChartData);
        this.stopRefreshing();
      },
      err => console.error(err)
    );
  }

  cmtePopupEmit(cmte) {
    this.cmteEmit.emit({
      cmte: cmte
    })
  }

  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

  public choice(selection) {
    this.selection = selection;
  }

}