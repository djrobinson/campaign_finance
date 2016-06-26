import {Component, OnInit} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
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
    console.log(this.type);
  }

  ngOnInit() {
    var repColors = ['#8D0801', '#6F1D1B', '#A85863'];
    var demColors = ['#91ADC5', '#145C9E', '#38369A'];
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
                item.tile_color = demColors[Math.floor(Math.random() * 3)];
                return item;
              } else if (item.PARTY_CODE === 'REP'){
                item.tile_color = repColors[Math.floor(Math.random() * 3)];
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
               this.http.get('/api/legislators/' + item.CANDIDATE_ID)
                 .map(res => res.json())
                 .subscribe(
                 secondData => {
                   console.log(secondData);
                   if (secondData[0].id){
                     item.profile_img = "https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/" + secondData[0].id.bioguide + ".jpg";
                     return item;
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

}