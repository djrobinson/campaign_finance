import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {ChoicesComponent} from '../api-helpers/api-choices.component';
import {ResultComponent} from '../api-helpers/api-result.component';
import {IndividualsTableComponent} from './individuals-table.component';
@Component({
  selector: 'individuals-view',
  template: `
            <div class="row">
              <choices
                [apiId]="6"
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
            <div *ngIf="result">
              <div *ngIf="!result[0].sum">
                <individuals-table
                  [individuals]="result">
                </individuals-table>
              </div>
            </div>
           `,
  providers: [TitleService],
  directives: [ChoicesComponent, ResultComponent, IndividualsTableComponent]
})
export class IndividualsComponent {
  public startRoute:string = '/api/individuals';
  constructor(private _titleService: TitleService) {  }
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