import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'bill-popup',
  template: `
            <h1>Bills Popup</h1>
            <div class="row">
            </div>
           `,
  providers: [TitleService],
  directives: []
})
export class BillPopupComponent implements OnInit {
  bill_id: string;
  constructor(private _titleService: TitleService
              private params: RouteParams) {
    this.bill_id = params.get('bill_id');
  }

  ngOnInit(){
    console.log(this.bill_id);
  }



}