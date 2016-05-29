import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
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
      </div>
      <div class="four columns">
        <h4>Other Bills Lobbied for Client</h4>
      </div>
    </div>
    <div class="row indiv twelve columns">
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }
    .table-div {
      height: 300px;
      overflow: scroll;
    }
        div {
      border: solid 1px #75717B;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      font-size: 8px;
    }
    .treemap {
      height: 300px;
    }
  `],
  directives: []
})
export class LobbyPopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() transaction_id: string;


  constructor(private _TitleService: TitleService,
    private http: Http) {
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit() {
    console.log(this.committee);
    Observable.forkJoin(


    ).subscribe(
      data => {

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