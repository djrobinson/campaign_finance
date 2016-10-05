import {Component, OnInit} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import {Http, Response} from 'angular2/http';
// import * as _ from 'lodash';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { Control, FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, NgForm } from 'angular2/common';
// import {NameFilter} from './name.filter';


@Component({
  selector: 'superpacs-view',
  styleUrls: ['app/superpacs/superpacs.css'],
  templateUrl: 'app/superpacs/superpacs.html',
  // pipes: [NameFilter],
})
export class SuperpacsComponent implements OnInit {
  private candidates: any[];
  private type: string;
  private sub: any;
  public name: string;
  public headerType: string;
  private dropdown: boolean = false;
  public states: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  public candidatesView: any[];


  constructor(
    private _params: RouteParams,
    public router: Router,
    public http: Http
    ){
    this.candidatesView = [];
    this.type = _params.get('type');
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit() {

    this.name = "";
    var repColors = ['maroon'];
    var demColors = ['#001f3f'];
    this.http.get('/api/pac/superpacs/list')
      .map(res => res.json())
      .subscribe(
        data => {

          /* if congressman */
          data = data.map(function(item){
            item.tile_color = 'solid gray 15px';
            return item;
          })
          this.candidates = data
          this.candidatesView = data;
          console.log(this.candidates);
        },
        err => console.log(err),
        () => console.log('Candidates Complete')
      );

      //Nasty hack.
      setTimeout(this.sortCandidates, 500);
  }

  public buildSuperGraph(candidate_id): void {
    this.router.navigate(['Graphs', { id: candidate_id }]);
  }

  public sortCandidates(): void {
    console.log("reverse");
    this.candidatesView = this.candidates;
    // this.candidatesView = _.sortBy(this.candidates, function(o){
    //   return parseFloat(o[column]);
    // }).reverse();
  }

  public setState(state)
  {
    console.log(this.candidates);
    this.filterByState(state);
    this.filterByState(state);
  }

  public filterByState(state) {
    this.candidatesView = this.candidates.filter(function(o){
      return (o.can_sta === state);
    });
    console.log(this.candidates);
  }

  public openFec(lin_ima){
    window.open(lin_ima);
  }
}