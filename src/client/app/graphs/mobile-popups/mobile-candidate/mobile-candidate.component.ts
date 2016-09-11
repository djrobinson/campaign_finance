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
  public type: string;
  public cand_id: string;
  public candidate: any;


  constructor(
    private http: Http,
    private _params: RouteParams,
    public router: Router) {
    this.cand_id = _params.get('cand');
    this.committee = _params.get('cmte');
    this.type = _params.get('type');
    console.log("Cand ID to mobile: ", this.cand_id);
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
    console.log("Init:", this.cand_id,"cmte:", this.committee);
      this.isRequesting = true;
      this.imageVar = {};
      this.selection = "main";
      if (!!this.cand_id && this.type === "P") {
        // this.route = '/api/pac/aggregate/' + this.candidate;
        this.imageVar.image = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + this.cand_id+'.jpg';
        this.typeString = "Superpac";
        this.isCand = true;
      } else {
        this.isCand = false;
      }
      if (this.isCand === true){
        this.callPresApis(this.cand_id)
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
        .map((res: Response) => res.json())
    ).subscribe(
      data => {

        this.stopRefreshing();
        this.candidate = data[0][0];
        console.log(data[0]);
      },
      err => console.error(err)
    );
  }

  public callCmteApis(cmte){
    console.log(cmte);
    Observable.forkJoin(
      this.http.get('/api/committees/'+cmte)
        .map((res: Response) => res.json())
    ).subscribe(
      data => {
        this.stopRefreshing();
         console.log("mobile cand date: ", data);
      },
      err => console.log("Error", err)
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