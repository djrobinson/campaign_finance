import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

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
          </div>s
        </div>

        <div class="one-half column">
          <h2>{{candidate?.CANDIDATE_NAME}}</h2>
          <div class="row">
            <div class="four columns">
              <h2>heyo</h2>
                <img [src]="imageVar?.image" alt="picture">
            </div>
            <div class="eight columns">
              <p>Office Sought: {{candidate?.CANDIDATE_OFFICE}}</p>
              <p>Hometown: {{candidate?.can_cit}}, {{candidate?.STATE}}</p>
              <p>Net Opex: {{candidate?.PARTY}}</p>
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
                <li  *ngFor="#pacspend of pacSpends">{{pacspend}}</li>
              </ul>
          </div>
        </div>
      <div class="row indiv twelve columns">
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .cand-style {
      text-align: center;
      height: 100px;
      font-size: 8px;
    }
    div {
      border: solid 1px #75717B;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      font-size: 8px;
    }
    .table-div {
      height: 350px;
      overflow: scroll;
    }
  `]
})
export class CandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Output() exitEmit = new EventEmitter();
  private candidate: Observable<Object>;
  private disbursements: Object;
  private candidateInfo: Object;
  private imageVar: Object;


  constructor(private _TitleService: TitleService,
              private http: Http) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
    console.log(this.candidate);

    this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
      console.log("cand info: ",data);
      this.candidateInfo = data[0];
      console.log("info: ", this.candidateInfo);
      if (this.candidateInfo){
        this.callApis(this.candidate, this.candidateInfo.id.bioguide, this.candidateInfo.id.thomas);
        this.imageVar = {};
        this.imageVar.image = 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/'+ this.candidateInfo.id.bioguide + '.jpg';
      } else {
        this.callApis(this.candidate, null, null)
      }
    }, error => console.log('Could not load todos.'));
    //Call teh legislators api to get the vote inputs

  }

  callApis(fecId, bioguideId, thomasId){
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/committees').map((res: Response) => res.json()),
      this.http.get('/api/votes/'+bioguideId+'/yeas').map((res: Response) => res.json()),
      this.http.get('/api/votes/'+bioguideId+'/nays').map((res: Response) => res.json()),
      this.http.get('/api/pac/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/pac/aggregate/'+fecId).map((res: Response) => res.json()),

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.yeaVotes = data[4];
        this.nayVotes = data[5];
        this.pacSpends = data[6];
        this.pacAgg = data[7];

      },
      err => console.error(err)
    );
  }

  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}