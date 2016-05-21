import {Component, Input, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'individual-popup',
  template: `
    <div class="title">
      <h3>{{title}}</h3>
      <h4>{{id}}</h4>
      <h4>Transaction Amount: {{amount}}</h4>
      <button>Go to Profile</button>
    </div>
  `,
  styles: [`
    .title {
      width: 100%;
      text-align: center;
    }
  `]
})
export class IndividualPopupComponent {
  //May want to start creating individual/committee types.
  @Input() individualTran: String;
  candidate: Object;

  constructor(private _TitleService: TitleService) { }

  ngOnInit() {
    this._TitleService.getResult('/api/individuals/transaction'+this.individualTran)
      .subscribe(
      result => { this.candidates = result },
      error => console.error('Error: ' + err),
      () => { }
      )
  }

}