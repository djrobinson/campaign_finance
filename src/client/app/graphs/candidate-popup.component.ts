import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'candidate-popup',
  template: `
    <div class="row">
      <h1>Candidate Popup</h1>
      <h5>{{candidate?.CANDIDATE_NAME}}</h5>
      <h5>{{candidate?.cas_on_han_clo_of_per}}</h5>
      <h5>{{candidate?.net_con}}</h5>
      <h5>{{candidate?.net_ope_exp}}</h5>
    </div>
    <div class="row indiv twelve columns">
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
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


  constructor(private _TitleService: TitleService,
    private http: Http) { }

  ngOnInit(){
    console.log(this.candidate);

    this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
      console.log(data);
      this.candidateInfo = data[0];
      console.log("info: ", this.candidateInfo);
      this.callApis(this.candidate, this.candidateInfo.id.bioguide, this.candidateInfo.id.thomas)
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

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.yeaVotes = data[4];
        this.nayVotes = data[5];
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