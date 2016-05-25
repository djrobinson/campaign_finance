import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';

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
  constructor(private _titleService: TitleService) {}
}