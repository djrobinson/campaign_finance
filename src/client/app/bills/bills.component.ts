import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {BillPopupComponent} from './bill-popup.component.ts';

@Component({
  selector: 'bills-view',
  template: `
            <h1>Bills View</h1>
            <div class="row">
              <div class="three columns">
                <ul *ngFor="#subject of subjects?.data">
                  <li><button (click)="searchSubject(subject)">{{subject}}</button></li>
                </ul>
              </div>
              <div class="nine columns">
                <ul *ngFor="#bill of bills?.data">
                  <li>{{bill.short_title}} <button>{{bill.bill_id}}</button> </li>
                </ul>
              </div>
            </div>
           `,
  providers: [TitleService],
  directives: [BillPopupComponent]
})
export class BillsComponent implements OnInit {
  constructor(private _titleService: TitleService) {}
  private this.subjects = {};
  private this.bills = {};

  ngOnInit(){
    this._titleService.getResult('/api/hr/all/topsubjects')
      .subscribe(
        result => {
          console.log(result);
          this.subjects.data = result;
        },
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
    }

  searchSubject(subject){
    console.log(subject);
    this._titleService.getResult('/api/hr/subject/'+subject)
      .subscribe(
        result => {
          console.log(result);
          this.bills.data = result;
        },
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
  }
}