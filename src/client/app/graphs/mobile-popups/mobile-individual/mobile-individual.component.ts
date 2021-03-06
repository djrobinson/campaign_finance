import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../../loading/spinner.component';
import {IndividualListPopupComponent} from '../../individual-popup/individual-popup-list.component';

@Component({
  selector: 'mobile-individual-popup',
  templateUrl: 'app/graphs/mobile-popups/mobile-individual/mobile-individual.html',
  styleUrls: ['app/graphs/mobile-popups/mobile-individual/mobile-individual.css'],
  directives: [SpinnerComponent, IndividualListPopupComponent]
})
export class MobileIndividualPopupComponent implements OnInit, OnChanges {
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
  public title: string;

  public testData: Date = new Date();

  constructor(
              private http:Http, private _routeParams:RouteParams) {
    this.individualTran = _routeParams.get('transaction')
  }

  public parseFloat = function(num) {
    return parseFloat(num);
  }

  ngOnInit() {
    var internalList = this.individualListPopupComponent;
    console.log(this.individualTran);
    Observable.forkJoin(
      this.http.get('/api/individuals/transaction/'+this.individualTran).map((res: Response) => res.json())
    ).subscribe(
      data => {
        this.isRequesting = false;
        console.log("Here's the indiv data: ", data);
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
    console.log("Transaction ID from event ", tranId);
    this.individualTran = tranId.transaction;
    this.http.get('/api/individuals/transaction/' + this.individualTran).map(response => response.json()).subscribe(data => {
      console.log("Transaction change indiv ", data);
      this.individual = data[0];
    }, error => console.log('Could not load transactions.'));
    this.isSelected = !this.isSelected;
    this.showList = !this.showList;
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

  openFec(lin_ima){
    window.open(lin_ima);
  }

}