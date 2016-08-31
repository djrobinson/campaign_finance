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
  public cash: number;
  public contributions: number;
  public distributions: number;
  public employer: string;

  constructor() {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
  }

  public searchNameTitle(name, employer){
    window.open('http://google.com/search?q='+name+' '+employer);
  }

  public searchName(name){
     window.open('http://google.com/search?q='+name);
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
