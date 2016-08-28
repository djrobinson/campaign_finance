import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';
import {IndividualListPopupComponent} from './individual-popup-list.component';

@Component({
  selector: 'individual-popup',
  templateUrl: 'app/graphs/individual-popup/individual-popup.html',
  styleUrls: ['app/graphs/individual-popup/individual-popup.css'],
  directives: [SpinnerComponent, IndividualListPopupComponent]
})
export class IndividualPopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() individualTran: string;
  @Input() indivName: string;
  @Output() exitEmit = new EventEmitter();
  @ViewChild(IndividualListPopupComponent) individualListPopupComponent: IndividualListPopupComponent;

  private individual: Observable<Object>;
  private otherIndividuals: Observable<Object>;
  private dataStore: Observable<Object>;
  private showList: boolean=true;
  private isSelected: boolean=false;
  public isRequesting: boolean=true;

  public testData: Date = new Date();

  constructor(
              private http:Http) {
  }

  public parseFloat = function(num) {
    return parseFloat(num);
  }

  ngOnInit() {
    var internalList = this.individualListPopupComponent;
    Observable.forkJoin(
      this.http.get('/api/individuals/transaction/'+this.individualTran).map((res: Response) => res.json())
    ).subscribe(
      data => {
        this.isRequesting = false;
        console.log(data);
        data[0][0].FEC_LINK = 'http://docquery.fec.gov/cgi-bin/fecimg/?' + data[0][0].IMAGE_NUM;
        this.individual = data[0][0];
      },
      err => console.error(err)
      );
  }

  buildList(data){
    console.log("Indivudial list cmpt ", this.individualListPopupComponent);
    this.individualListPopupComponent.createList(data);
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

  public searchNameTitle(name, employer){
    window.open('http://google.com/search?q='+name+' '+employer);
  }

  public searchName(name){
     window.open('http://google.com/search?q='+name);
  }

  public callList(){
    this.isSelected = !this.isSelected;
    this.showList = !this.showList;
  }

}