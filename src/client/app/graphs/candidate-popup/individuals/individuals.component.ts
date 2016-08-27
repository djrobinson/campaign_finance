import {Component, Input, Output, OnInit} from 'angular2/core';
import {BubbleComponent} from '../../charts/bubble-chart.component';
import {IndividualsListComponent} from './individuals-list.component';


@Component({
  selector: 'individuals-section',
  templateUrl: 'app/graphs/candidate-popup/individuals/individuals-partial.html',
  styleUrls: ['app/graphs/candidate-popup/individuals/individuals-partial.css'],
  directives: [BubbleComponent, IndividualsListComponent]
})
export class IndividualsSectionComponent implements OnInit {
  @Input() cmte: string;
  public showList: boolean = false;
  private isRequesting: boolean;
  private isSelected: boolean = false;

  ngOnInit(){
  }

  public callIndividuals(){
    this.isSelected = !this.selected;
    this.showList = !this.showList;
  }
}


