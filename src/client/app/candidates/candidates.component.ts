import {Component, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';


@Component({
  selector: 'candidates-view',
  styleUrls: ['app/candidates/candidates.css'],
  templateUrl: 'app/candidates/candidates.html'
})
export class CandidatesComponent implements OnInit {
  private candidates: string;
  private type: string;
  private sub: any;

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private params: RouteParams
    ){
    this.type = params.get('type');
    console.log(this.type);
  }

  ngOnInit() {
  }
}