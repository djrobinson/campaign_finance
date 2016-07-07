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
import {IndividualsSectionComponent} from './individuals/individuals.component.ts';
import {CommitteesSectionComponent} from './committees/committees.component';

@Component({
  selector: 'candidate-popup',
  templateUrl: 'app/graphs/candidate-popup/candidate-popup.html',
  styleUrls: ['app/graphs/candidate-popup/candidate-popup.css'],
  directives: [TreemapComponent, TypePieComponent, SizePieComponent, DsgnPieComponent, BarComponent]
})
export class CandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Input() committee: string;
  @Input() isCandidate: boolean;
  @Output() exitEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() treemapEmit = new EventEmitter();
  @ViewChild(TypePieComponent) typePieComponent: TypePieComponent;
  @ViewChild(SizePieComponent) sizePieComponent: SizePieComponent;
  @ViewChild(DsgnPieComponent) dsgnPieComponent: DsgnPieComponent;
  @ViewChild(TreemapComponent) treemapComponent: TreemapComponent;
  @ViewChild(BarComponent) barComponent: BarComponent;

  private disbursements: Object;
  private candidateInfo: Object;
  private contributions: Object;
  private imageVar: Object;
  private associatedCommittees: Object = {};
  private pacSpends: Object;
  private route: string;
  private typeString: string;
  public itemizedDonations: number;
  public committeeDonations: number;
  public barChartData: any;
  public selection: string;

  constructor(
    private http: Http) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
      this.imageVar = {};
      this.selection = "main";
      if (this.candidate.charAt(0) === "P") {
        this.route = '/api/pac/aggregate/' + this.candidate;
        this.imageVar.image = "https://raw.githubusercontent.com/djrobinson/campaign_finance/master/candidates/" + this.candidate + ".jpg";
        this.typeString = "Superpac";
      } else {
        this.route = '/api/disbursements/graph/' + this.candidate;
        this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
          this.candidateInfo = data[0];
          this.imageVar = {};
          this.imageVar.image = "https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/" + this.candidateInfo.id.bioguide + ".jpg";
          this.typeString = "candidate disbursement";
        }, error => console.log('Could not load candidate info.'));
      }

      this.callPresApis(this.candidate)

  }


  callPresApis(fecId){

    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId)
        .map((res: Response) => res.json()), //0
      this.http.get('/api/disbursements/'+fecId+'/candidate')
        .map((res: Response) => res.json()), //1
      this.http.get('/api/contributions/'+fecId+'/candidate')
        .map((res: Response) => res.json()), //2
      this.http.get('/api/candidates/'+fecId+'/associated')
        .map((res: Response) => res.json()), //3
      this.http.get('/api/pac/'+fecId+'/candidate')
        .map((res: Response) => res.json()), //4
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
        this.disbursements = data[1];
        data[2] = data[2].map(function(el){
          el.IMAGE_NUM = "http://docquery.fec.gov/cgi-bin/fecimg/?" + el.IMAGE_NUM;
          return el;
        })
        this.contributions = data[2];
        this.associatedCommittees = data[3][0];
        this.pacSpends = data[4];
        var primary_cmte = data[3].filter((cmte)=>{
          if(cmte.CMTE_DSGN === "P"){
            return cmte
          };
        });
        this.typePieComponent.callAsc(data[6]);
        this.sizePieComponent.callAsc(data[7]);
        this.dsgnPieComponent.callAsc(data[5]);

        this.itemizedDonations = parseInt(data[7].count);
        this.committeeDonations = data[6].reduce((prev, item)=>{
          return prev + +item.count;
        }, 0)

        var barChartData = data[8].concat(data[9]);
        this.barComponent.buildChart(barChartData);
      },
      err => console.error(err)
    );
  }

  showTreemapEmit(route){
    this.treemapEmit.emit({
      route: route
    })
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

}