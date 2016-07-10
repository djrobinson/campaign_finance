import {Component, Input, Output, OnInit} from 'angular2/core';
import {TreemapComponent} from '../../charts/treemap.component';

@Component({
  selector: 'opex-section',
  templateUrl: 'app/graphs/candidate-popup/opex/opex-partial.html',
  styleUrls: ['app/graphs/candidate-popup/opex/opex-partial.css'],
  directives: [TreemapComponent]
})
export class OpexSectionComponent implements OnInit {
  @Input() cmte: string;
  private route: string;
  ngOnInit(){
    this.route = '/api/opex/aggregate/' + this.cmte;
  }
}