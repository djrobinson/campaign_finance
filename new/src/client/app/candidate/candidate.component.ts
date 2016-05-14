import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {ChoicesComponent} from '../api-helpers/api-choices.component';
import {ResultComponent} from '../api-helpers/api-result.component';
import {CandidateTableComponent} from './candidate-table.component';
import {AssociatedTableComponent} from './associated-table.component';

@Component({
  selector: 'candidate-view',
  template: `
            <div class="row">
              <choices
                [apiId]="1"
                [currentRoute]="startRoute"
                (routeChange)="newRoute($event);"
                class="one-third column">
              </choices>
              <api-result
                [currentRoute]="currentRoute"
                [result]="result"
                class="two-thirds column">
              </api-result>
            </div>
            <div *ngIf="result" class="row twelve columns">
              <div *ngIf="!result[0].LINKAGE_ID">
                <candidate-table
                  [candidates]="result">
                </candidate-table>
              </div>
              <div *ngIf="result[0].LINKAGE_ID">
                <associated-table
                  [candidates]="result">
                </associated-table>
              </div>
            </div>

           `,
  providers: [TitleService],
  directives: [ChoicesComponent, ResultComponent, CandidateTableComponent, AssociatedTableComponent]
})
export class CandidateComponent implements OnInit {
  public startRoute:string = '/api/candidates';
  constructor(private _titleService: TitleService) {
    this._choicesComponent: ChoicesComponent;
  }
  setSelected(id){
    console.log(id);
    this.selected = id;
  }
  newRoute(event){
    console.log(event);
    this.getJson(event.value);
    this.currentRoute=event.value;
  }

  getJson(route){
    this._titleService.getResult(route)
      .subscribe(
        result => this.result = result,
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
    }
}
