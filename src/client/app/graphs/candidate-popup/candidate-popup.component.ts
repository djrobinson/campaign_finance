  import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
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
  @Input() candidate: any;
  @Input() committee: string;
  @Input() isCand: boolean;
  @Input() popster: boolean;
  @Output() exitEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() changeIndiv = new EventEmitter();
  @ViewChild(TypePieComponent) typePieComponent: TypePieComponent;
  @ViewChild(SizePieComponent) sizePieComponent: SizePieComponent;
  @ViewChild(DsgnPieComponent) dsgnPieComponent: DsgnPieComponent;
  @ViewChild(BarComponent) barComponent: BarComponent;

  public disbursements: Object;
  public candidateInfo: Object;
  public contributions: Object;
  public imageVar: Object;
  public associatedCommittees: Object = {};
  public pacSpends: Object;
  public route: string;
  public typeString: string;
  public isRequesting: boolean;
  public itemizedDonations: number;
  public committeeDonations: number;
  public barChartData: any;
  public selection: string;
  public primaryCmte: any;
  public pacSupport: any;
  public pacOppose: any;
  public longName: boolean;

  constructor(
    private http: Http) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){

      if (this.popster) {
        d3.select(".cand-style")
          .style('border', 'solid 10px aqua')
      } else {
        d3.select(".cand-style")
          .style('border', 'none')
      }
      console.log(this.typePieComponent);
      this.isRequesting = true;
      this.imageVar = {};
      this.selection = "main";
      if (!!this.candidate && this.isCand === true && this.candidate.charAt(0) === "P") {
        // this.route = '/api/pac/aggregate/' + this.candidate;
        this.imageVar.image = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + this.candidate+'.jpg';
        this.typeString = "Superpac";
        this.isCand = true;
      } else {
        this.isCand = false;
      }
      if (this.isCand === true){
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
        .map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/associated')
        .map((res: Response) => res.json()),
      this.http.get('api/transfers/'+this.committee+'/designation')
        .map((res: Response) => res.json()),
      this.http.get('api/transfers/'+this.committee+'/cmtetype')
        .map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log("Candidate popup data: ", data);
        this.stopRefreshing();
        this.candidate = data[0][0];
        this.primaryCmte = data[1].filter((cmte)=>{
          if(cmte.CMTE_DSGN === "P"){
            return cmte
          };
        })[0];
        console.log("Cand Data")
        console.log("Primary length: ",this.primaryCmte.CMTE_NM.length);
        if (this.primaryCmte.CMTE_NM.length > 20 ){
          this.longName = true;
        } else {
          this.longName = false;
        }
        this.typePieComponent.callAsc(data[3]);
        this.committeeDonations = data[3].reduce((prev, item)=>{
          return prev + +item.count;
        }, 0);
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

        this.stopRefreshing();
        this.candidate = data[0][0];
        console.log("Primary length: ",this.candidate.com_nam.length);
        if (this.candidate.com_nam.length > 30 ){
          this.longName = true;
        } else {
          this.longName = false;
        }
        this.typePieComponent.callAsc(data[2]);
        this.dsgnPieComponent.callAsc(data[1]);
        this.committeeDonations = data[2].reduce((prev, item)=>{
          return prev + +item.count;
        }, 0)
      },
      err => console.error(err)
    );
  }

  cmtePopupEmit(cmte) {
    this.cmteEmit.emit({
      cmte: cmte
    })
  }

  public changeTran(event){
    console.log("Change indiv Candidate Level", event);
    this.changeIndiv.emit({
      tranId: event.transaction,
      name: event.name
    });
  }

  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

  public choice(selection) {
    this.selection = selection;
  }

  public openFec(){
    window.open(this.candidate.lin_ima);
  }

}