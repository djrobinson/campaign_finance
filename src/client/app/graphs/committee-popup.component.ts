import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'committee-popup',
  template: `
    <div class="row">
      <h1>Committee Popup</h1>
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
export class CommitteePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() committee: string;
  @Output() exitEmit = new EventEmitter();
  private committee: Observable<Object>;


  constructor(private _TitleService: TitleService,
    private http: Http) { }

  ngOnInit(){
    console.log(this.committee);
    Observable.forkJoin(
      this.http.get('/api/committees/'+this.committee).map((res: Response) => res.json()),
      this.http.get('/api/individuals/committee/'+this.committee).map((res: Response) => res.json()),
      this.http.get('/api/transfers/'+this.committee+'/contributor').map((res: Response) => res.json()),
      this.http.get('/api/transfers/'+this.committee+'/recipient').map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log(data);
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