import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import { Router, RouteParams } from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {OpexSectionComponent} from '../../candidate-popup/opex/opex.component';
import {SuperpacsSectionComponent} from '../../candidate-popup/superpacs/superpacs.component';
import {IndividualsSectionComponent} from '../../candidate-popup/individuals/individuals.component';
import {CommitteesSectionComponent} from '../../candidate-popup/committees/committees.component';
import {SpinnerComponent} from '../../../loading/spinner.component';

@Component({
  selector: 'mobile-candidate-popup',
  templateUrl: 'app/graphs/mobile-popups/mobile-candidate/mobile-candidate.html',
  styleUrls: ['app/graphs/mobile-popups/mobile-candidate/mobile-candidate.css'],
  directives: [OpexSectionComponent, SuperpacsSectionComponent, CommitteesSectionComponent, IndividualsSectionComponent, SpinnerComponent]
})
export class MobileCandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.

  @Input() candidate: string;
  @Input() committee: string;
  @Input() isCand: boolean;
  @Output() exitEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() changeIndiv = new EventEmitter();

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
    console.log("Init:", this.candidate,"cmte:", this.committee);
      this.isRequesting = true;
      this.imageVar = {};
      this.selection = "main";
      // if (!!this.candidate && this.isCand === true && this.candidate.charAt(0) === "P") {
      //   // this.route = '/api/pac/aggregate/' + this.candidate;
      //   this.imageVar.image = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + this.candidate+'.jpg';
      //   this.typeString = "Superpac";
      //   this.isCand = true;
      // } else {
      //   this.isCand = false;
      // }
      // if (this.isCand === true){
      //   this.callPresApis(this.candidate)
      // } else {
      //   this.callCmteApis(this.committee);
      // }
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

        this.stopRefreshing();
        this.candidate = data[0][0];
        this.primaryCmte = data[1].filter((cmte)=>{
          if(cmte.CMTE_DSGN === "P"){
            return cmte
          };
        })[0];
        this.typePieComponent.callAsc(data[3]);
        this.dsgnPieComponent.callAsc(data[2]);
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