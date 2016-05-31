import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'lobby-popup',
  template: `
    <div class="row">
      <div class="four columns">
         <h2>Sponsors</h2>
      </div>
      <div class="four columns">
        <h4>Lobby Issue Info</h4>
        <h5>{{billId}}</h5>
        <h5>{{currLobby?.data?.client_parent_name}}</h5>
      </div>
      <div class="four columns">
        <h4>Other Bills Lobbied for Client</h4>
        <ul>
          <li *ngFor="#trans of transactionBills?.data">{{trans}}</li>
        </ul>
      </div>
    </div>
    <div class="row indiv twelve columns">
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
  `],
  directives: []
})
export class LobbyPopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() transaction: string;
  @Input() billId: string;
  @Output() exitEmit = new EventEmitter();
  private transactionBills: Object = {};
  private currLobby: Object = {};

  constructor(private http: Http) {
    // this.parseFloat = function(num) {
    //   return parseFloat(num);
    // }
  }

  ngOnInit() {
    Observable.forkJoin(
      this.http.get('/api/lobby/transaction/' + this.transaction).map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log(data[0])
        this.transactionBills.data = data[0];
        this.currLobby.data = data[0].filter(function(lobby) {
          console.log(lobby.bill_id)
          if (lobby.bill_id === this.billId) {
            return lobby;
          }
        });
        console.log(this.currLobby);
      },
      err => console.error(err)
      );
  }

  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}