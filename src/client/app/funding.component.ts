import {Component, OnInit, CORE_DIRECTIVES} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import { Control, FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, NgForm } from 'angular2/common';

          // <input
          //   [(ngModel)]="amount"
          //   type="number"
          //   name="amount">
          // <br>
          // <div class="button" (click)="openCheckout(amount)">Submit</div>
          // <div *ngIf="thankYou">
          //   <p>Thank you for your contribution!</p>
          // </div>
          // <br>
@Component({
  selector: 'funding',
  template: `
    <div class="funding-container">
      <h1>Support Citizens Hub</h1>





      <div class="button" (click)="bitcoinAddress()">
        Bitcoin Address
      </div>
      <div *ngIf="bitcoin" >
        1JWj61zs5a2mpg56oXPePeJ3YMvCZwjvoF
      </div>
      <br>
      <div class="button" (click)="ethereumAddress()">
        Ethereum Address
      </div>
      <div *ngIf="ethereum">
        0xAdDd8248C1aa3EDa0246f1E57bF7c56Eb372bCE2
      </div>
    </div>
  `,
  styles: [`
    .funding-container {
      font-family: 'Oswald';
      font-weight: 300;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .button {
      font-family: 'Oswald';
      font-weight: 500;
      background-color: #73877B; /* Green */
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      cursor: pointer;
      background-color: white;
      color: black;
      border: 2px solid #9DBF9E;
      border-radius: 25px;
      box-sizing: border-box;;
      width: 20%;

    }

    .button:hover {
        background-color: #9DBF9E;
        color: white;
    }
  `],
  providers: [],
  directives: []

})
export class FundingComponent implements OnInit {
  private transaction;
  amount: number;
  thankYou: boolean;
  bitcoin: boolean;
  ethereum: boolean;

  constructor(private http: Http) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }

  }

  doTransaction(event) {
    console.log(event);
  }

  ngOnInit() {
      this.amount = 20
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

  openCheckout(amount) {
    console.log("Checkout amount: ", amount);
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_18jB465AmfCTngdGeiBtSqqp',
      locale: 'auto',
      token: function(token){
        console.log("Token sending: ", token);
        var body =  JSON.stringify({
              stripeToken: token,
              amount: amount
            });
        var headers = new Headers();
          headers.append('Content-Type', 'application/json');
        this.http.post('/api/stripe', body, {headers: headers})
          .map(res => res.json())
          .subscribe(
            data => this.useData(data),
            err => this.handleError(err),
            () => console.log('TransactionComplete')
          );
      }.bind(this)
    });

    handler.open({
      name: 'Citizens Hub',
      description: 'Hosting & Development',
      amount: amount * 100
    });

    console.log(handler);
  }


  useData(data){
    this.amount = 0;
    this.thankYou = true;
    console.log("Data token", data);
  }

  handleError(error){
    console.log(error);
  }

  ethereumAddress(){
    this.ethereum = true;
  }

  bitcoinAddress(){
    this.bitcoin = true;
  }

}




