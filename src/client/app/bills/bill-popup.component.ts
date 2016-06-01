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
            <lobby-popup
              *ngIf="lobbyPopup"
              transaction="{{transaction_id}}"
              billId="{{bill_id}}"
              (exitEmit)="exit()"
              >
            </lobby-popup>
            <div class="bill-container">
                <bill-overview
                *ngIf="billData?.data"
                [overview]="billData?.data">
                </bill-overview>

                <bill-votes
                *ngIf="billVotes?.data"
                [votes]="billVotes?.data">
                </bill-votes>

                <lobby-issues
                  *ngIf="lobbyIssues?.data"
                  [issues]="lobbyIssues?.data"
                  (showLobbyEmit)="showLobbyPopup($event)">

                </lobby-issues>
            </div>
           `,
  styles: [`
      lobby-popup {
        position: fixed;
        top: 15px;
        bottom: 15px;
        left: 20px;
        right: 20px;
        border: solid 1px #75717B;
        background-color: #FEFFFE;
        z-index: 2;
      }
      .bill-container {
        position: relative;
        height: 100%;
        width: 100%;
      }
      .bill-overview {
        text-align: center;
        position: relative;
        width: 100%;
      }
      .bill-votes {
        position: relative;
        width: 100%;
      }
      .lobby-issues {
        position: relative;
        width: 100%;
      }

  `],
  providers: [TitleService],
  directives: [LobbyPopupComponent, BillVotesComponent, BillOverviewComponent, LobbyIssuesComponent]
})
export class BillPopupComponent implements OnInit {
  bill_id: string;
  congress: string;
  billData: Observable<Object> = {};
  billVotes: Observable<Object> = {};
  lobbyIssues: Observable<Object> = {};
  lobbyPopup: boolean = false;
  transaction_id: string;

  constructor(private _titleService: TitleService
              private params: RouteParams
              private http: Http ) {
    this.bill_id = params.get('bill_id');
    this.congress = params.get('congress');
  }

  ngOnInit(){
    if (this.bill_id.charAt(0).toLowerCase() === 'h'){
      var dashIndex = this.bill_id.indexOf('-');
      var idNum = this.bill_id.slice(2, dashIndex);
      var lobbyId = 'H.R.'+idNum;
      var voteId = 'h'+idNum;

      Observable.forkJoin(
      this.http.get('/api/votes/id/'+this.congress+'/'+idNum).map((res: Response) => res.json()),
      this.http.get('/api/hr/'+this.bill_id).map((res: Response) => res.json()),
      this.http.get('/api/lobby/bill/'+this.bill_id).map((res: Response) => res.json())

    ).subscribe(
      data => {
        this.billData.data = data[1][0];
        this.billVotes.data = data[0];
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
    this.lobbyPopup = true;
    this.transaction_id = event.lobby;
  }

  exit(){
    this.lobbyPopup = false;
  }



}