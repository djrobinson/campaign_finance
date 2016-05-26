import {Component, Input, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'treemap',
  template: `
    <div class="row">

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
export class TreemapComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.

  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}