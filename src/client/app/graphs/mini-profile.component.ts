import {Component, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
  template: `
    <div class="title">
      <h3>{{title}}</h3>
      <h4>{{id}}</h4>
      <h4>Transaction Amount: {{amount}}</h4>
      <button (click)="indivPopupEmit(id, title)">Go to Profile</button>
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
  @Input() node: Object;
  @Output() indivEmit = new EventEmitter();
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

  indivPopupEmit(tranId, name){
    console.log(tranId);
    this.indivEmit.emit({
      tranId: tranId,
      name: name
    });
  }
}
