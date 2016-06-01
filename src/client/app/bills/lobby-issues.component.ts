import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';

@Component({
  selector: 'lobby-issues',
  template: `

              <div class="lobby-container row">
                <h2>Lobbyist Issues w/ Bill</h2>
                <div
                  class="issue"
                  *ngFor="#issue of issues"
                  (click)="showLobby(issue.transaction_id)">
                  <p>{{issue.bill_id}}</p>
                  <p>{{issue.client_name}}</p>
                  <p>{{issue.general_issue}}</p>
                  <p>{{issue.amount}}</p>
                </div>
              </div>
  `,
  styles: [`
    .issue {
      display: inline-block;
      width: 20%;
      height: 180px;
      vertical-align: top;
      border: solid 1px gray;

    }
  `],
  directives: []
})
export class LobbyIssuesComponent {
  //May want to start creating individual/committee types.
  @Input() issues: string;
  @Output() showLobbyEmit = new EventEmitter();

  ngOnInit(){
    console.log(this.issues);
  }

  showLobby(transaction){
    console.log("showLobby ", transaction)
    this.showLobbyEmit.emit({
      lobby: transaction
    });
  }

}