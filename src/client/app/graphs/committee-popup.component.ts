import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'committee-popup',
  template: `
    <div class="row">
      <h1>Committee Popup</h1>
    </div>
    <div class="row indiv twelve columns">
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }
  `]
})
export class CommitteePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() individualTran: string;
  @Input() indivName: string;
  @Output() exitEmit = new EventEmitter();
  private committee: Observable<Object>;


  constructor(private _TitleService: TitleService,
    private http: Http) { }


  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}