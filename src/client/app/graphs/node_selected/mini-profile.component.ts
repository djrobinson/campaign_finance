import {Component, OnInit, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
  template: `
    <div class="title">
      <h1>{{node.CMTE_NM}}</h1>
      <h2>{{node.CMTE_ID}}</h2>
      <h2>Transaction Amount: {{node.TRANSACTION_AMT}}</h2>
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
export class MiniProfileComponent implements OnInit {
  @Input() node;

  constructor(private _TitleService: TitleService) {}

}
