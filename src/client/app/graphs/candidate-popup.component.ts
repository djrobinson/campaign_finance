import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';
import {TreemapComponent} from './charts/treemap.component';
import {PieComponent} from './charts/pie-chart.component';


@Component({
  selector: 'candidate-popup',
  template: `
    <div class="cand-style">
        <div class="three columns">
            <h5>Sources of Funds</h5>
          <div class="table-div">
            <ul>
              <li *ngFor="#contribution of contributions">{{contribution.NAME}}: {{contribution.TRANSACTION_AMT}}</li>
            </ul>
          </div>
        </div>

        <div class="one-half column">
          <h2>{{candidate?.CANDIDATE_NAME}}</h2>
          <div class="row">
            <div class="four columns">
              <img [src]="imageVar?.image" alt="picture">
            </div>
            <div class="eight columns">
              <p>Office Sought: {{candidate?.CANDIDATE_OFFICE}}</p>
              <p>Hometown: {{candidate?.can_cit}}, {{candidate?.STATE}}</p>
              <p>Birthdate: {{candidateInfo?.bio?.birthday}}</p>
              <p>Gender: {{candidateInfo?.bio?.gender}}</p>
              <p>Religion: {{candidateInfo?.bio?.religion}}</p>
              <p><a [href]="candidate?.lin_ima">FEC Filing Link</a></p>
            </div>
          </div>
          <div class="row">
            <div class="six columns">
              <p><em>Begin Cash: </em> {{parseFloat(candidate?.cas_on_han_clo_of_per) | currency:'USD':true}}</p>
              <p><em>End Cash: </em> {{parseFloat(candidate?.cas_on_han_clo_of_per) | currency:'USD':true}}</p>
              <p><em>Debt: </em> {{parseFloat(candidate?.deb_owe_by_com) | currency:'USD':true}}</p>
              <p><em>Funding from Candidate: </em> {{parseFloat(candidate?.can_con) | currency:'USD':true}}</p>
            </div>
            <div class="six columns">
              <p><em>Net Contributions: </em> {{parseFloat(candidate?.net_con) | currency:'USD':true}}</p>
              <p><em>Net Opex: </em> {{parseFloat(candidate?.net_ope_exp) | currency:'USD':true}}</p>
              <p><em>Distributions: </em> {{parseFloat(candidate?.tot_dis) | currency:'USD':true}}</p>
            </div>
          </div>
        </div>
        <div class="three columns">

            <div>
              <h3>Usage of Funds</h3>
            </div>
            <div class="table-div">
              <ul>
                <li  *ngFor="#pacspend of pacSpends">{{pacspend.pay}} {{pacspend.exp_amo}}</li>
              </ul>
          </div>
        </div>
        <div class="row">
           <div class="three columns">

            <pie-chart>
            </pie-chart>
           </div>
           <div class="three columns">
              <treemap route="/api/pac/aggregate/P00003392">
              </treemap>
           </div><div class="three columns">
            <div class="table-div">
              <ul>
                <li *ngFor="#item of disbursements">{{item}}</li>
              </ul>
            </div>
           </div><div class="three columns">
            <div class="table-div">
              <ul>
                <li *ngFor="#item of yeaVotes">{{item}}</li>
              </ul>
            </div>
           </div>
        </div>
      <div class="row indiv twelve columns">
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  directives: [TreemapComponent, PieComponent],
  styles: [`
    .cand-style {
      text-align: center;
      font-size: 10px;
    }
    div {
      border: solid 1px #75717B;
    }
    img {
      width: 100%;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      font-size: 8px;
    }
    .table-div {
      height: 300px;
      overflow: scroll;
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
  private imageVar: Object;
  private associatedCommittees: {};


  constructor(private _TitleService: TitleService,
              private http: Http) {

    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
    // this.buildTreeMap();
    // this.buildPieChart();
    this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
      this.candidateInfo = data[0];
      if (this.candidateInfo){
        this.callApis(this.candidate, this.candidateInfo.id.bioguide, this.candidateInfo.id.thomas, this.candidateInfo.id.lis);
        this.imageVar = {};
        this.imageVar.image = 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/'+ this.candidateInfo.id.bioguide + '.jpg';
      } else {
        this.callPresApis(this.candidate)
      }
    }, error => console.log('Could not load todos.'));
    //Call teh legislators api to get the vote inputs

  }

  callApis(fecId, bioguideId, thomasId, lis){
    if (lis){
      var voteId = lis;
    } else if (bioguideId) {
      var voteId = bioguideId;
    } else {
      var voteId = null;
    }
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/committees').map((res: Response) => res.json()),
      this.http.get('/api/votes/'+voteId+'/yeas').map((res: Response) => res.json()),
      this.http.get('/api/votes/'+voteId+'/nays').map((res: Response) => res.json()),
      this.http.get('/api/votes/tallies/yea').map((res: Response) => res.json()),
      this.http.get('/api/votes/tallies/nay').map((res: Response) => res.json()),
      this.http.get('/api/pac/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/pac/aggregate/'+fecId).map((res: Response) => res.json())

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.yeaVotes = data[4];
        this.nayVotes = data[5];
        this.allNays = data[6];
        this.allYeas = data[7];
        this.pacSpends = data[8];
        this.pacAgg = data[9];


        this.pieComponent.callAsc(data[3]);

      },
      err => console.error(err)
    );
  }

  callPresApis(fecId){
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/committees').map((res: Response) => res.json()),
      this.http.get('/api/pac/'+fecId+'/candidate').map((res: Response) => res.json()),

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.pacSpends = data[4];
        this.pieComponent.callAsc(data[3]);

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