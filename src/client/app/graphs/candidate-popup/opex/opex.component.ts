import {Component, Input, Output, OnInit} from 'angular2/core';

@Component({
  selector: 'opex-section',
  templateUrl: 'app/graphs/candidate-popup/opex/opex-partial.html',
  styleUrls: ['app/graphs/candidate-popup/opex/opex-partial.css'],
  directives: []
})
export class OpexSectionComponent implements OnInit {
  ngOnInit(){
    console.log("We've got opex going on!");
  }
}