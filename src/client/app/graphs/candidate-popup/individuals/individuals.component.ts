import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';
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
  @Output() changeIndiv = new EventEmitter();

  ngOnInit(){
  }

  public callIndividuals(){
    this.isSelected = !this.isSelected;
    this.showList = !this.showList;
  }

  public changeTran(event){
    console.log("Change indiv Individual Level", event);
    this.changeIndiv.emit({
      transaction: event.transaction,
      name: event.name
    });
  }
}


