import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';


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
                  <a [routerLink]="['Bill', {bill_id: bill.bill_id, congress: bill.congress}]">Go here</a><li>{{bill.short_title}}
                     <button
                      (click)="selectBill(bill.bill_id)">
                      {{bill.bill_id}}
                     </button>
                    </li>
                </ul>
              </div>
            </div>

           `,
  providers: [TitleService],
  directives: [ROUTER_DIRECTIVES],
  styles:[`

  `]
})
export class BillsComponent implements OnInit {
  constructor(private _titleService: TitleService
              private router: Router) {
  }
  private subjects = {};
  private bills = {};

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

  selectBill(bill_id){
    console.log(bill_id);
    this.router.navigate(['/bills']);
  }

  searchSubject(subject){
    console.log(subject);
    this._titleService.getResult('/api/hr/subject/'+subject)
      .subscribe(
        result => {
          console.log("bills ", result);
          result.sort(function(a, b) {
            return b.actions.length - a.actions.length;
          });
          this.bills.data = result;
        },
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
  }
}