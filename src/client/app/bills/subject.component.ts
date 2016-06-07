import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'subject-view',
  templateUrl: 'app/bills/templates/subject.html',
  providers: [TitleService],
  directives: [ROUTER_DIRECTIVES],
  styles: [`
    .bill-button {
      vertical-align: top;
      width: 100%;
      border: solid 1px gray;
    }
    .categories-row {
      position: relative;
      width: 100%;
    }
  `]
})
export class SubjectComponent implements OnInit {
  private subject: string;
  constructor(private _titleService: TitleService,
              private router: Router,
              private params: RouteParams) {
    this.subject = params.get('subject');
  }
  private bills = {};

  ngOnInit() {
    console.log(this.subject);
    this.searchSubject(this.subject);
  }

  private selectBill(bill_id):void {
    this.router.navigate(['/bills']);
  }

  private searchSubject(subject):void {
    this._titleService.getResult('/api/hr/subject/' + subject)
      .subscribe(
      result => {
        result.sort(function(a, b) {
          return b.actions.length - a.actions.length;
        });
        console.log(result);
        this.bills.data = result;
      },
      error => console.error('Error: ' + err),
      () => console.log('Completed!')
      );
  }
}