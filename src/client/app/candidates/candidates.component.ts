import {Component, OnInit} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import {Http, Response} from 'angular2/http';
import * as _ from 'lodash';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
  selector: 'candidates-view',
  styleUrls: ['app/candidates/candidates.css'],
  templateUrl: 'app/candidates/candidates.html'
})
export class CandidatesComponent implements OnInit {
  private candidates: any[];
  private type: string;
  private sub: any;
  public headerType: string;
  private dropdown: boolean = false;
  public states: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  public candidatesView: any[];

  constructor(
    private _params: RouteParams,
    public router: Router,
    public http: Http
    ){
    this.type = _params.get('type');
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit() {

    var repColors = ['maroon'];
    var demColors = ['#001f3f'];
    this.http.get('/api/candidates/'+this.type+'/type')
      .map(res => res.json())
      .subscribe(
        data => {
          /* IF PRESIDENT */
          if (this.type === 'P'){
            this.headerType = 'Presidential';
            var finalData = data.map((item) => {
              // var currImg = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + item.CANDIDATE_ID + '.jpg';

              function imageExists(url, callback) {
                var img = new Image();
                img.onload = function() { callback(true); };
                img.onerror = function() { callback(false); };
                img.src = url;
              }

              // Sample usage
              var imageUrl = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + item.CANDIDATE_ID + '.jpg';
              imageExists(imageUrl, function(exists) {
                if (exists) {
                  console.log(imageUrl);
                  item.profile_img = imageUrl;
                } else {
                  item.profile_img = 'http://www.purplestrategies.com/wp-content/uploads/2014/04/placeholder_male@2x.png';
                }
              });
              if (item.PARTY_CODE === 'DEM'){
                item.tile_color = "solid "+demColors[0]+" 5px";
                return item;
              } else if (item.PARTY_CODE === 'REP'){
                item.tile_color = "solid "+repColors[0]+" 5px";
                return item;
              } else {
                item.tile_color = '#4C4664';
                return item;
              }
            })
          /* if congressman */
          } else {
            if (this.type === 'S'){
              this.headerType = 'Senate';
            } else if (this.type === 'H'){
              this.headerType = 'House';
            }
            var finalData = data.map((item) => {
              if (item.PARTY_CODE === 'DEM') {
                item.tile_color = demColors[Math.floor(Math.random() * 3)];
              } else if (item.PARTY_CODE === 'REP') {
                item.tile_color = repColors[Math.floor(Math.random() * 3)];
              } else {
                item.tile_color = '#4C4664';
              }
               this.http.get('/api/legislators/' + item.CANDIDATE_ID)
                 .map(res => res.json())
                 .subscribe(
                 secondData => {
                   if (secondData[0].id){
                     item.profile_img = "https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/" + secondData[0].id.bioguide + ".jpg";
                   }
                 },
                 err => console.log(err),
                 () => console.log("Image Call Complete")
                )
              })
              console.log("Final Data ", finalData);
          }

          this.candidates = data
          this.candidatesView = data;
          console.log(this.candidates);
        },
        err => console.log(err),
        () => console.log('Candidates Complete')
      );
  }

  public buildGraph(candidate_id): void {
    console.log("inbound");
    this.router.navigate(['Graphs', { id: candidate_id }]);
  }

  public sortCandidates(column): void {
    this.candidatesView = _.sortBy(this.candidates, function(o){
      return parseFloat(o[column]);
    }).reverse();
  }

  public setState(state)
  {
    console.log(this.candidates);
    console.log("Saver ", this.candidatesView);
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