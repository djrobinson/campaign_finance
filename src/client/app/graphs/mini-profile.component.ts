import {Component, OnInit, OnChanges, Input} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
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
export class MiniProfileComponent implements OnChanges {
  //Need to think about how to type this input!
  @Input() node;
  title: string;
  id: string;
  amount: number;

  constructor(private _TitleService: TitleService) {}

  ngOnChanges(changes: { [node: string]: SimpleChange }) {
    if (this.node.graphtype === "individual") {
      this.title = this.node.NAME;
      this.id = this.node.TRAN_ID;
      this.amount = this.node.TRANSACTION_AMT;
    } else if (this.node.graphtype === "committee"){
      this.title = this.node.CMTE_NM;
      this.id = this.node.OTHER_ID;
      this.amount = this.node.TRANSACTION_AMT;
    } else if (this.node.graphtype === "candidate"){
      this.title = this.node.data.CANDIDATE_NAME;
      this.id = this.node.can_id;
      this.amount = this.node.tot_con;
    }
  }

}
