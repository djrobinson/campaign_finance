import {Component, Input, Output, OnInit} from 'angular2/core';
import {TreemapComponent} from '../../charts/treemap.component';
import {OpexListComponent} from './opex-list.component';

@Component({
  selector: 'opex-section',
  templateUrl: 'app/graphs/candidate-popup/opex/opex-partial.html',
  styleUrls: ['app/graphs/candidate-popup/opex/opex-partial.css'],
  directives: [TreemapComponent, OpexListComponent]
})
export class OpexSectionComponent implements OnInit {
  @Input() cmte: string;
  private route: string;
  private showList: boolean=false;
  private isSelected: boolean=false;
  ngOnInit(){
    this.route = '/api/opex/aggregate/' + this.cmte;
  }

  public callList(){
    this.isSelected = !this.isSelected;
    this.showList = !this.showList;
  }
}