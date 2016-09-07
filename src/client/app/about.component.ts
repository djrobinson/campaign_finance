import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'about',
  styles: [`

  `],
  template: `
    <h1>About Page</h1>
  `,
  directives: []

})
export class AboutComponent implements OnInit {

  ngOnInit() {
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}