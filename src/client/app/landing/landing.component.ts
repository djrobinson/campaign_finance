import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  styleUrls: ['app/landing/landing.css'],
  templateUrl: 'app/landing/landing.html',
  directives: [ROUTER_DIRECTIVES]

})
export class Landing implements OnInit {
  public landing: boolean;
  constructor(private router: Router) {  }

  ngOnInit() {
    this.landing = true;
  }

  public buildGraph(candidate_id): void {
    this.router.navigate(['Graphs', { id: candidate_id }]);
  }

  public home(): void {
    console.log("Home");
    this.router.navigate(['Landing']);
  }

  public about(): void {
    console.log("Home");
    this.router.navigate(['About']);
  }

  public methods(): void {
    console.log("Home");
    this.router.navigate(['Methods']);
  }

  public funding(): void {
    console.log("Home");
    this.router.navigate(['Funding']);
  }

  public candPath(typeVar): void {
    console.log("inbound");
    this.router.navigate(['Candidates', { type: typeVar } ]);
    this.sideMenu = false;
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}
