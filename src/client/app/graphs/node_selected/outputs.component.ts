import {Component, OnInit, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'outputs-view',
  template: `
    <h1>Outputs View</h1>
    <p>{{outputNode.CMTE_ID}}</p>

  `
})
export class OutputsComponent {
  @Input() outputNode;
  constructor(private _TitleService: TitleService) { }


  ngOnInit() {
    console.log("we're here!");
  }
}
