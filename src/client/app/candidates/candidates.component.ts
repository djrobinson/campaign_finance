import {Component, OnInit} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import {Http, Response} from 'angular2/http';
import * as _ from 'lodash';

@Component({
  selector: 'candidates-view',
  styleUrls: ['app/candidates/candidates.css'],
  templateUrl: 'app/candidates/candidates.html'
})
export class CandidatesComponent implements OnInit {
  private candidates: string;
  private type: string;
  private sub: any;
  public headerType: string;

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

    console.log('lodash version: ', _.VERSION);
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
              var currImg = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + item.CANDIDATE_ID + '.jpg';
              item.profile_img = currImg;
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
                   console.log(secondData);
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
          console.log(this.candidates);
        },
        err => this.logError(err),
        () => console.log('Candidates Complete')
      );
  }

  public buildGraph(candidate_id): void {
    console.log("inbound");
    this.router.navigate(['Graphs', { id: candidate_id }]);
  }

  public sortCandidates(column): void {
    this.candidates = _.sortBy(this.candidates, column);
    console.log("This Candidates")

  }

}