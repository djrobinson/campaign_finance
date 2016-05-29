import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';


@Component({
  selector: 'bill-popup',
  template: `
            <h1>Bills Popup</h1>
            <div class="row">
              <div class="four columns">
                <h2>Bill Overview</h2>
                <h3>{{billData?.data?.official_title}}</h3>
                <h5>{{billData?.data?.subjects_top_term}}</h5>
                <h5>{{billData?.data?.bill_id}}</h5>
                <ul>
                  <li *ngFor="#sponsor of billData?.data?.cosponsors">
                    <p>{{sponsor.name}}</p>
                  </li>
                </ul>
                <ul>
                  <li *ngFor="#action of billData?.data?.actions">
                    <p>{{action.text}}</p>
                  </li>
                </ul>
              </div>
              <div class="four columns">
                <h2>Bill Votes</h2>
                <h5>{{billVotes?.data?.category}}</h5>
                <h5>{{billVotes?.data?.question}}</h5>
                <h5>{{billVotes?.data?.result_text}}</h5>
                <h5>{{billVotes?.data?.source_url}}</h5>
                <h5>{{billVotes?.data?.requires}}</h5>
              </div>
              <div class="four columns">
                <h2>Lobbyist Issues w/ Bill</h2>
                <ul>
                  <li *ngFor="#issue of lobbyIssues?.data">
                    <p>{{issue.bill_id}} {{issue.issue_id}}</p>
                  </li>
                </ul>
              </div>

            </div>
           `,
  providers: [TitleService],
  directives: []
})
export class BillPopupComponent implements OnInit {
  bill_id: string;
  billData: Observable<Object> = {};
  billVotes: Observable<Object> = {};
  lobbyIssues: Observable<Object> = {};

  constructor(private _titleService: TitleService
              private params: RouteParams
              private http: Http ) {
    this.bill_id = params.get('bill_id');
  }

  ngOnInit(){
    console.log(this.bill_id);
    if (this.bill_id.charAt(0).toLowerCase() === 'h'){
      var dashIndex = this.bill_id.indexOf('-');
      var idNum = this.bill_id.slice(2, dashIndex);
      var lobbyId = 'H.R.'+idNum;
      var voteId = 'h'+idNum;
      console.log(this.bill_id);

      Observable.forkJoin(
      this.http.get('/api/votes/id/'+voteId).map((res: Response) => res.json()),
      this.http.get('/api/hr/'+this.bill_id).map((res: Response) => res.json()),
      this.http.get('/api/lobby/bill/'+lobbyId).map((res: Response) => res.json())

    ).subscribe(
      data => {
        this.billData.data = data[1][0];
        this.billVotes.data = data[0][0];
        this.lobbyIssues.data = data[2];
        console.log(data);

      },
      err => console.error(err)
    );
    } else if (this.bill_id.charAt(0).toLowerCase() === 's'){
      this.bill_id = 'S';
    }
  }



}