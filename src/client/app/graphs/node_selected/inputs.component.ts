import {Component, OnInit, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'inputs-view',
  template: `
    <h1>Inputs here</h1>
    <p>{{inputNode.CMTE_ID}}</p>
  `
})
export class InputsComponent {
  @Input() inputNode;
  constructor(private _TitleService: TitleService) { }



  ngOnInit() {
    console.log("we're here!");
  }
}
