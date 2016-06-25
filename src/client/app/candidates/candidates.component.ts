import {Component, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {Http, Response} from 'angular2/http';

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
    private _params: RouteParams,
    private http: Http
    ){
    this.type = _params.get('type');
    console.log(this.type);
  }

  ngOnInit() {
    this.http.get('/api/candidates/'+this.type+'/type')
      .map(res => res.json())
      .subscribe(
        data => this.candidates = data,
        err => this.logError(err),
        () => console.log('Random Quote Complete')
      );
  }
}