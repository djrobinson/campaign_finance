import {Component, OnInit, OnChanges, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
  template: `
    <div class="title">
      <h1>{{title}}</h1>
      <h2>{{id}}</h2>
      <h2>Transaction Amount: {{amount}}</h2>
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
export class MiniProfileComponent implements OnChanges {
  //Need to think about how to type this input!
  @Input() node;
  title: string;
  id: string;
  amount: number;

  constructor(private _TitleService: TitleService) {}

  ngOnChanges(changes: { [node: string]: SimpleChange }) {
    if (this.node.NAME) {
      this.title = this.node.NAME;
      this.id = this.node.TRAN_ID;
      this.amount = this.node.TRANSACTION_AMT;
    } else if (this.node.OTHER_ID){
      this.title = this.node.CMTE_NM;
      this.id = this.node.OTHER_ID;
      this.amount = this.node.TRANSACTION_AMT;
    }
  }

}
