import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import { Router, RouteParams } from 'angular2/router';


@Component({
  selector: 'committees-section',
  templateUrl: 'app/graphs/candidate-popup/committees/committees-partial.html',
  styleUrls: ['app/graphs/candidate-popup/committees/committees-partial.css'],
  directives: []
})
export class CommitteesSectionComponent implements OnInit {
  @Input() cmte: string;
  @Input() isMobile: boolean;
  private committees: any;

  constructor(private http:Http, public router: Router) {

  }

  public parseFloat = function(num){
    return parseFloat(num);
  }

  ngOnInit(){
    console.log(this.cmte);
    this.http.get('/api/transfers/' + this.cmte + '/contributor').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.committees = data;
    }, error => console.log('Could not load committees.'));
  }

  changeCmte(cmte_id){
    console.log(cmte_id);
    this.router.navigate(['MobileCandidatePopupComponent', { cand: "committee", cmte: cmte_id, type: "C" } ]);
  }

  public openFec(lin_ima){
    console.log("Open FEC: ", lin_ima);
    window.open(lin_ima);
  }
}
