import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';

@Component({
  selector: 'individual-popup',
  templateUrl: 'app/graphs/individual-popup/individual-popup.html',
  styleUrls: ['app/graphs/individual-popup/individual-popup.css'],
  directives: [SpinnerComponent]
})
export class IndividualPopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() individualTran: string;
  @Input() indivName: string;
  @Output() exitEmit = new EventEmitter();
  private individual: Observable<Object>;
  private otherIndividuals: Observable<Object>;
  private dataStore: Observable<Object>;

  constructor(
              private http:Http) {
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

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
        this.otherIndividuals = {};
        this.otherIndividuals.data = data[1];
      },
      err => console.error(err)
      );
  }

  changeIndiv(tranId){
    this.individualTran = tranId;
    this.http.get('/api/individuals/transaction/' + this.individualTran).map(response => response.json()).subscribe(data => {
      console.log(data);
      this.individual = data[0];
    }, error => console.log('Could not load transactions.'));
  }

  close(){
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}