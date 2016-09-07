import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'funding',
  styles: [`

  `],
  template: `
    <h1>Funding Page</h1>
  `,
  directives: []

})
export class FundingComponent implements OnInit {

  ngOnInit() {
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}