import {Component, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
  template: `
    <div class="title">
      <div class="five columns">
        <h5>{{title}}</h5>
        <p>FEC ID: {{id}}</p>
      </div>
      <div class="five columns">
        <div *ngIf="popupType ==='candidate'">
          <table class="cand-table">
            <tr>
              <td>Cash</td>
              <td>{{parseFloat(cash) | currency:'USD':true}}</td>
            </tr>
            <tr>
              <td>Net Contributions</td>
              <td>{{parseFloat(contributions) | currency:'USD':true}}</td>
            </tr>
            <tr>
              <td>Net Distributions</td>
              <td>{{parseFloat(distributions) | currency:'USD':true}}</td>
            </tr>
          </table>
        </div>
        <div *ngIf="popupType ==='associated'">
          <table class="cand-table">
            <tr>
              <td>Cash</td>
              <td>{{parseFloat(cash) | currency:'USD':true}}</td>
            </tr>
            <tr>
              <td>Net Contributions</td>
              <td>{{parseFloat(contributions) | currency:'USD':true}}</td>
            </tr>
            <tr>
              <td>Net Distributions</td>
              <td>{{parseFloat(distributions) | currency:'USD':true}}</td>
            </tr>
          </table>
        </div>
        <div *ngIf="popupType ==='individual' || 'committee'">
          <div class="transaction">
            <h5>Transaction Amount: {{parseFloat(amount) | currency:'USD':true}}</h5>
          </div>
        </div>
      </div>
      <div class="two columns">
        <div>
          <div *ngIf="popupType === 'individual'">
            <button (click)="indivPopupEmit(id, title)">Profile</button>
          </div>
          <div *ngIf="popupType === 'committee' || popupType === 'associated'">
            <button (click)="cmtePopupEmit(id)">Profile</button>
          </div>
          <div *ngIf="popupType === 'candidate'">
            <button (click)="candPopupEmit(id)">Profile</button>
          </div>
          <div *ngIf="popupType === 'congress'">
            <button (click)="congressPopupEmit(id)">Profile</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .title {
      width: 100%;
      text-align: center;
      border: solid 1px #3B3561;
      height: 150px;
      background-color: white;
      overflow: hidden;
    }

    .transaction {
      margin-top: 50px;
    }

    .cand-table {
      margin: 0 !important;;
    }
    button {
      position: relative;
      top: 50px;
    }
  `]
})
export class MiniProfileComponent implements OnChanges {
  @Input() node: Object;
  @Output() indivEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() candEmit = new EventEmitter();
  @Output() congressEmit = new EventEmitter();
  private title: string;
  private id: string;
  private amount: number;
  private popupType: string;

  constructor(private _TitleService: TitleService) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnChanges(changes: { [node: string]: SimpleChange }) {
    if (this.node.graphtype === "individual") {
      this.title = this.node.NAME;
      this.id = this.node.TRAN_ID;
      this.amount = this.node.TRANSACTION_AMT;
      this.popupType = "individual";
    } else if (this.node.graphtype === "committee") {
      this.title = this.node.CMTE_NM;
      this.id = this.node.OTHER_ID;
      console.log("committee id ", this.id)
      this.amount = this.node.TRANSACTION_AMT;
      this.popupType = "committee";
    } else if (this.node.graphtype === "associated"){
      this.title = this.node.CMTE_NM;
      this.id = this.node.OTHER_ID || this.node.CMTE_ID;
      console.log("committee id ", this.id)
      this.cash = this.node.cas_on_han_clo_of_per;
      this.contributions = this.node.net_con;
      this.distributions = this.node.tot_dis;
      this.popupType = "associated";
    } else if (this.node.graphtype === "candidate"){
      this.title = this.node.data.CANDIDATE_NAME;
      this.id = this.node.CAND_ID;
      this.cash = this.node.data.cas_on_han_clo_of_per;
      this.contributions = this.node.data.tot_con;
      this.distributions = this.node.data.tot_dis;
      if (this.node.CAND_ID.charAt(0)==="P"){
        this.popupType = "candidate";
      } else {
        this.popupType = "congress";
      }

    }
  }

  indivPopupEmit(tranId, name){
    this.indivEmit.emit({
      tranId: tranId,
      name: name
    });
  }

  cmtePopupEmit(cmte){
    console.log(cmte);
    this.cmteEmit.emit({
      cmte: cmte
    })
  }

  candPopupEmit(cand){
    console.log(cand);
    this.candEmit.emit({
      cand: cand
    })
  }

  congressPopupEmit(cand) {
    console.log(cand);
    this.congressEmit.emit({
      cand: cand
    })
  }


}
