import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'lobby-popup',
  templateUrl: 'app/lobbyists/lobby-popup.html',
  styles: [`
    .lobbyist {
      position: absolute;
      width: 50%;
      left: 0;
    }
    .other-lobbies {
      width: 100%;
      border: solid 1px gray;
      overflow: hidden;
    }
    .other-lobbies-container {
      position: absolute;
      height: 100%;
      width: 50%;
      right: 0;
      overflow: scroll;
    }
    .lobby-popup-container {
      position: relative;
      height: 90%;
      width: 100%;
    }
    .indiv {
      position: absolute;
      text-align: center;
      height: 5%;
      bottom: 0;
    }
  `],
  directives: []
})
export class LobbyPopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() transaction: string;
  @Input() billId: string;
  @Output() exitEmit = new EventEmitter();
  private transactionBills: Object = {};
  private first: Object = {};

  constructor(private http: Http) {
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit() {
    console.log("Current bill ID ", this.billId);
    Observable.forkJoin(
      this.http.get('/api/lobby/transaction/' + this.transaction).map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log(data[0])
        this.transactionBills.data = data[0];
        this.transactionBills.issueCount = data[0].length;
        this.first = data[0][0];
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