import {Component, OnInit, OnChanges, Input} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'outputs-view',
  template: `
        <h3>Outputs</h3>
        <ul *ngFor="#result of results">
          <li>{{result.TRANSACTION_AMT}}</li>
        </ul>

  `
})
export class OutputsComponent implements OnChanges, OnInit{
  //Need to think about how to type this input!
  @Input() outputNode;
  constructor(private _TitleService: TitleService,
              private http: Http) {}

  ngOnChanges(changes: { [outputNode: string]: SimpleChange }) {
    if (this.outputNode.NAME) {
      this._TitleService.getResult('/api/individuals?donor=' + this.outputNode.NAME)
        .subscribe(
        result => { this.results = result },
        error => console.error('Error: ' + err),
        () => { }
        )
    } else if (this.outputNode.OTHER_ID) {
      Observable.forkJoin(
        this.http.get('/api/pac/' + this.outputNode.OTHER_ID + '/committee').map((res: Response) => res.json()),
        this.http.get('/api/transfers/' + this.outputNode.OTHER_ID + '/contributor').map((res: Response) => res.json())
        this.http.get('/api/contributions/' + this.outputNode.OTHER_ID + '/committee').map((res: Response) => res.json())
      ).subscribe(
        data => {
          console.log(data);
          this.results = data[0].concat(data[1]).concat(data[2]);
        },
        err => console.error(err)
        );
    }
  }
}
