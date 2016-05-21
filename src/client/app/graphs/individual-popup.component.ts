import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'individual-popup',
  template: `
    <div class="title">
      <h3>{{individual?.NAME}}</h3>
      <h4>{{individual?.CITY }}</h4>
      <h4>{{individual?.STATE}}</h4>
      <h4>{{individual?.EMPLOYER}}</h4>
      <h4>{{individual?.OCCUPATION}}</h4>
      <h4>{{individual?.NAME}}</h4>
      <h4>{{individual?.TRANSACTION_DT}}</h4>
      <h4><a [href]="individual?.FEC_LINK">Link</a></h4>
      <h4>Transaction Amount: {{individual?.TRANSACTION_AMT}}</h4>
      <button (click)="close">Close</button>

    </div>
  `,
  styles: [`
    .title {
      width: 100%;
      text-align: center;
    }
  `]
})
export class IndividualPopupComponent implements OnInit {
  //May want to start creating individual/committee types.
  @Input() individualTran: string;
  @Input() indivName: string;
  @Output() exitEmit = new EventEmitter();
  individual: Observable<Object>;

  constructor(private _TitleService: TitleService,
              private http:Http) { }

  ngOnInit() {
    console.log(this.individualTran, this.indivName);
    Observable.forkJoin(
      this.http.get('/api/individuals/transaction/'+this.individualTran).map((res: Response) => res.json()),
      this.http.get('/api/individuals?donor=' + this.indivName).map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log(data);
        data[0][0].FEC_LINK = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + data[0][0].IMAGE_NUM;
        this.individual = data[0][0];

      },
      err => console.error(err)
      );
    // this._TitleService.getResult('/api/individuals/transaction/'+this.individualTran)
    //   .subscribe(
    //   result => {
    //     console.log(result[0]);
    //     result[0].FEC_LINK = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + result[0].IMAGE_NUM;
    //     this.individual = result[0];
    //   },
    //   error => console.error('Error: ' + error),
    //   () => { }
    //   )
  }

  close(){
    this.exitEmit.emit({
      exit: true
    });
  }

}