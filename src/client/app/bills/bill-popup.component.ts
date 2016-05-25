import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';


@Component({
  selector: 'bill-popup',
  template: `
            <h1>Bills Popup</h1>
            <div class="row">
            </div>
           `,
  providers: [TitleService],
  directives: []
})
export class BillPopupComponent implements OnInit {
  bill_id: string;
  constructor(private _titleService: TitleService
              private params: RouteParams
              private http: Http ) {
    this.bill_id = params.get('bill_id');
  }

  ngOnInit(){
    console.log(this.bill_id);
    if (this.bill_id.charAt(0).toLowerCase() === 'h'){
      var dashIndex = this.bill_id.indexOf('-');
      var idNum = this.bill_id.slice(2, dashIndex);
      var lobbyId = 'H.R.'+idNum;
      var voteId = 'h'+idNum;
      console.log(this.bill_id);

      Observable.forkJoin(
      this.http.get('/api/votes/id/'+voteId).map((res: Response) => res.json()),
      this.http.get('/api/hr/'+this.bill_id).map((res: Response) => res.json()),
      this.http.get('/api/lobby/'+lobbyId).map((res: Response) => res.json())

    ).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err)
    );
    } else if (this.bill_id.charAt(0).toLowerCase() === 's'){
      this.bill_id = 'S';
    }
  }



}