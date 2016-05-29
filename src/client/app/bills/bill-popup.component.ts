import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import {LobbyPopupComponent} from '../lobbyists/lobby-popup.component';
import {BillVotesComponent} from './bill-votes.component';
import {BillOverviewComponent} from './bill-overview.component';
import {LobbyIssuesComponent} from './lobby-issues.component';

@Component({
  selector: 'bill-popup',
  template: `
            <h1>{{lobbyPopup}} Popup</h1>

            <lobby-popup
              *ngIf="lobbyPopup"
              (exitEmit)="exit()"
              >
            </lobby-popup>
            <div class="row">
              <div class="four columns" *ngIf="billData.data">
                <bill-overview [overview]="billData?.data">
                </bill-overview>
              </div>
              <div class="four columns" *ngIf="billVotes.data">
                <bill-votes [votes]="billVotes?.data">
                </bill-votes>
              </div>
              <div class="four columns" *ngIf="lobbyIssues.data">
                <lobby-issues
                  [issues]="lobbyIssues?.data"
                  (showLobbyEmit)="showLobbyPopup($event)">

                </lobby-issues>
              </div>

            </div>
           `,
  styles: [`
      lobby-popup {
        position: absolute;
        top: 15px;
        bottom: 15px;
        left: 20px;
        right: 20px;
        background-color: blue;
      }

  `],
  providers: [TitleService],
  directives: [LobbyPopupComponent, BillVotesComponent, BillOverviewComponent, LobbyIssuesComponent]
})
export class BillPopupComponent implements OnInit {
  bill_id: string;
  billData: Observable<Object> = {};
  billVotes: Observable<Object> = {};
  lobbyIssues: Observable<Object> = {};
  lobbyPopup: boolean = false;
  transaction_id: string;

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

  showLobbyPopup(event){
    console.log(event.lobby);
    this.lobbyPopup = true;
    this.transaction_id = event.lobby;
  }

  exit(){
    this.lobbyPopup = false;
  }



}