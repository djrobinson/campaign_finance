import {Component, OnInit} from 'angular2/core';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'bills-view',
  template: `
            <div class="row">
              <h1>Bills View</h1>
              <ul *ngFor="#subject of subjects?.data">
                <li><button (click)="searchSubject(subject)">{{subject}}</button></li>
              </ul>
            </div>
           `,
  providers: [TitleService],
  directives: []
})
export class BillsComponent implements OnInit {
  constructor(private _titleService: TitleService) {}
  private this.subjects = {};

  ngOnInit(){
    this._titleService.getResult('/api/hr/all/topsubjects')
      .subscribe(
        result => {
          console.log(result);
          this.subjects.data = result;
        },
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
    }

  searchSubject(subject){
    console.log(subject);
  }
}