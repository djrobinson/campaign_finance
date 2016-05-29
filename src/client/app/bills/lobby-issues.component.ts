import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';

@Component({
  selector: 'lobby-issues',
  template: `
                <h2>Lobbyist Issues w/ Bill</h2>
                <ul>
                  <li *ngFor="#issue of issues">
                    <button (click)="showLobby(issue.transaction_id)"> {{issue.bill_id}} </button>
                  </li>
                </ul>
  `,
  styles: [`

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