import {Component, OnInit, CORE_DIRECTIVES} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import { Control, FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, NgForm } from 'angular2/common';
// <h5>Contribute to the development and hosting of Citizens Hub.</h5>
//       <div class="button" (click)="openCheckout()">Contribute</div>
@Component({
  selector: 'funding',
  template: `
    <div class="funding-container">
      <h1>Support Citizens Hub</h1>
      <h1>Add user</h1>
      <form [ngFormModel]="formData" (ngSubmit)="doTransaction($event)" novalidate>
          <input
            [ngFormControl]="amount"
            type="text"
            name="name"
            required minlength="5">
        <!--show error only when field is not valid & it's dirty or form submited-->
          <button type="submit">Submit</button>
      </form>
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
      width: 15%;

    }

    .button:hover {
        background-color: #9DBF9E;
        color: white;
    }
  `],
  providers: [FORM_PROVIDERS],
  directives: [FORM_DIRECTIVES]

})
export class FundingComponent implements OnInit {
  private transaction;
  formData: ControlGroup;

  constructor(private http: Http, fb: FormBuilder) {
    this.parseFloat = function(num){
      return parseFloat(num);
    }
    this.formData = fb.group({
      amount: ["", Validators.required]
    });
  }

  doTransaction(event) {
    console.log(this.formData.value);
    event.preventDefault();
  }

  ngOnInit() {
    this.transaction = {
      amount: 20
    }
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

  openCheckout(amount, valid) {
    console.log("Checkout amount: ", amount);
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_18jB465AmfCTngdGeiBtSqqp',
      locale: 'auto',
      token: function(token){
        console.log("Token sending: ", token);
        var body =  JSON.stringify({
              stripeToken: token,
              amount: 20
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
      amount: 2000
    });

    console.log(handler);
  }


  useData(data){
    console.log("Data token", data);
  }

  handleError(error){
    console.log(error);
  }

}




