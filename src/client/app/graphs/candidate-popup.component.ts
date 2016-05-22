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


  constructor(private _TitleService: TitleService,
    private http: Http) { }

  ngOnInit(){
    console.log(this.candidate);
    Observable.forkJoin(
      this.http.get('/api/candidates/'+this.candidate).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+this.candidate+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+this.candidate+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+this.candidate+'/committees').map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
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