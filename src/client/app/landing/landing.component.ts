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
    console.log("inbound");
    this.router.navigate(['Graphs', { id: candidate_id }]);
  }

}
