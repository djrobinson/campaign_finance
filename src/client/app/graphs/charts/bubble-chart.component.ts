import {Component, Input, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'bubble-chart',
  template: `
      <div id="containerChart3">
        <div id="chart3">
        </div>
      </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }

    #containerChart2 {
      height: 100%;
      width: 100%;
    }

  `]
})
export class BubbleComponent implements OnInit {
  constructor(private http: Http) {}
}