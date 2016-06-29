import {Component, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
@Component({
  selector: 'mini-profile-view',
  templateUrl: 'app/graphs/mini-profile/mini-profile.html',
  styleUrls: ['app/graphs/mini-profile/mini-profile.css']
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

  constructor() {
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
      // if (this.node.CAND_ID.charAt(0)==="P"){
        this.popupType = "candidate";
      // } else {
      //   this.popupType = "congress";
      // }

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
