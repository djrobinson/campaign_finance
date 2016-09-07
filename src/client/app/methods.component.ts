import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'methods',
  styles: [`

  `],
  template: `
    <h1>Methods Page</h1>
  `,
  directives: []

})
export class MethodsComponent implements OnInit {

  ngOnInit() {
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}