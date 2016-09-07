import {Component, OnInit} from 'angular2/core';
import {StripeFormComponent} from './stripe-form.component';

@Component({
  selector: 'funding',
  template: `
    <h1>Funding Template</h1>
    <sd-stripe-form></sd-stripe-form>
  `,
  styles: [`

  `],

  directives: [StripeFormComponent]

})
export class FundingComponent implements OnInit {

  ngOnInit() {
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}




