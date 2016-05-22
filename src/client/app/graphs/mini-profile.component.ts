import {Component, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
  template: `
    <div class="title">
      <h3>{{title}}</h3>
      <h4>{{id}}</h4>
      <h4>Transaction Amount: {{amount}}</h4>
      <div *ngIf="popupType === 'individual'">
        <button (click)="indivPopupEmit(id, title)">Go to Profile</button>
      </div>
      <div *ngIf="popupType === 'committee'">
        <button (click)="cmtePopupEmit(id)">Go to Profile</button>
      </div>
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
  private title: string;
  private id: string;
  private amount: number;
  private popupType: string;

  constructor(private _TitleService: TitleService) {}

  ngOnChanges(changes: { [node: string]: SimpleChange }) {
    if (this.node.graphtype === "individual") {
      this.title = this.node.NAME;
      this.id = this.node.TRAN_ID;
      this.amount = this.node.TRANSACTION_AMT;
      this.popupType = "individual";
    } else if (this.node.graphtype === "committee" || this.node.graphtype === "associated") {
      this.title = this.node.CMTE_NM;
      this.id = this.node.OTHER_ID;
      this.amount = this.node.TRANSACTION_AMT;
      this.popupType = "committee";
    } else if (this.node.graphtype === "candidate"){
      this.title = this.node.data.CANDIDATE_NAME;
      this.id = this.node.can_id;
      this.amount = this.node.tot_con;
      this.popupType = "candidate";
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
