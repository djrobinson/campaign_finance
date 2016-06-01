import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
  selector: 'bills-view',
  templateUrl: 'app/bills/templates/bills.html',
  providers: [TitleService],
  directives: [ROUTER_DIRECTIVES],
  styles:[`
    .subject-button {
      display: inline-block;
      vertical-align: top;

      width: 15%;
      height: 200px;
      border: solid 1px gray;
    }
    .categories-row {
      position: relative;
      width: 100%;
    }
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