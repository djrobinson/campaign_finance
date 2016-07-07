import {Component, OnChanges, OnInit, Input, Output, EventEmitter} from 'angular2/core';
@Component({
  selector: 'mini-profile-view',
  templateUrl: 'app/graphs/mini-profile/mini-profile.html',
  styleUrls: ['app/graphs/mini-profile/mini-profile.css']
})
export class MiniProfileComponent implements OnChanges, OnInit {
  @Input() node: Object;
  @Input() bioguide: string;
  @Output() indivEmit = new EventEmitter();
  @Output() cmteEmit = new EventEmitter();
  @Output() candEmit = new EventEmitter();
  @Output() congressEmit = new EventEmitter();
  private title: string;
  private id: string;
  private cmte_id: string;
  private amount: number;
  private popupType: string;
  public picture: string;

  constructor() {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
    if (this.bioguide.length){
          this.picture =  "https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/" + this.bioguide[0].id.bioguide + ".jpg";
        } else {
          this.picture = "https://raw.githubusercontent.com/djrobinson/campaign_finance/master/candidates/" + this.node.CAND_ID + ".jpg"
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
      this.amount = this.node.TRANSACTION_AMT;
      this.popupType = "committee";
    } else if (this.node.graphtype === "associated"){
      this.title = this.node.CMTE_NM;
      this.id = this.node.OTHER_ID || this.node.CMTE_ID;
      this.cash = this.node.cas_on_han_clo_of_per;
      this.contributions = this.node.net_con;
      this.distributions = this.node.tot_dis;
      this.popupType = "associated";
    } else if (this.node.graphtype === "candidate"){
      this.title = this.node.data.CANDIDATE_NAME;
      this.id = this.node.CAND_ID;
      this.cmte_id = this.node.CMTE_ID;
      this.cash = this.node.data.cas_on_han_clo_of_per;
      this.contributions = this.node.data.tot_con;
      this.distributions = this.node.data.tot_dis;
      this.popupType = "candidate";
    }
  }

  indivPopupEmit(tranId, name){
    this.indivEmit.emit({
      tranId: tranId,
      name: name
    });
  }

  cmtePopupEmit(cmte){
    this.cmteEmit.emit({
      cmte: cmte
    })
  }

  candPopupEmit(cand, cmte_id){
    this.candEmit.emit({
      cand: cand,
      cmte_id: cmte_id
    })
  }

  congressPopupEmit(cand) {
    this.congressEmit.emit({
      cand: cand
    })
  }


}
