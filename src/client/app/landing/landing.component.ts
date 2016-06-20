import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  styles: [
  `

    .landing-container {
      display: flex;
      background-color: #17324f;
      height: calc(100vh - 50px);
      width: 100%;
      flex-direction: column;
      justify-content: space-around;
    }

    .flexrow {
      display: flex;
      justify-content: space-around;
    }

    #oval {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 50rem;
      height: 30rem;
      border: solid 7px #16191F;
      background: #CBCED2;
      -moz-border-radius: 25rem / 15rem;
      -webkit-border-radius: 25rem / 15rem;
      border-radius: 25rem / 15rem;
    }

    .notice {
      text-align: center;
      color: #AF3E4D;
    }

    .campaign {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background-color: #16191F;
      height: 200px;
      color: #CBCED2;
    }

    .campaign:hover {
      background-color: #CBCED2;
      color: #16191F;
    }

  `
  ],
  templateUrl: 'app/landing/landing.html',
  directives: [ROUTER_DIRECTIVES]

})
export class Landing implements OnInit {
  public landing: boolean;
  constructor(private router: Router) {  }

  ngOnInit() {
    this.landing = true;
  }

  public graphs():void {
    this.router.navigate(['Graphs']);
  }

  public votes():void {
    this.router.navigate(['Bills']);
  }
}
