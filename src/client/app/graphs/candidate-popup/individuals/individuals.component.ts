import {Component, Input, Output, OnInit} from 'angular2/core';
import {BubbleComponent} from '../../charts/bubble-chart.component';

@Component({
  selector: 'individuals-section',
  templateUrl: 'app/graphs/candidate-popup/individuals/individuals-partial.html',
  styleUrls: ['app/graphs/candidate-popup/individuals/individuals-partial.css'],
  directives: [BubbleComponent]
})
export class IndividualsSectionComponent implements OnInit {
  @Input() cmte: string;
  ngOnInit(){
    console.log("Individuals!!");
  }
}


