import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {ChoicesComponent} from '../api-helpers/api-choices.component';
import {ResultComponent} from '../api-helpers/api-result.component';
import {CommitteeTableComponent} from './committee-table.component';

@Component({
  selector: 'committee-view',
  styles: [`
            .api-route {
              display: flex;
              justify-content: space-around;
              flex-direction: column;
              background: #963D5A;
              margin: 1rem;
            }
            .route-column {
              order: 1;
            }
            api-result {
              display: flex;
              order: 2;
              overflow: scroll;
              width: 100%;
            }
            .wrapper {
              display: flex;
              position: relative;
              height: 100%;
            }
            `],
  template: `
            <h1>Committee Routes</h1>
            <div class="wrapper">
              <div class="route-column">
                <choices
                  [apiId]="4"
                  [currentRoute]="startRoute"
                  (routeChange)="newRoute($event);">
                </choices>
              </div>
              <api-result
                [currentRoute]="currentRoute"
                [result]="result">
              </api-result>
            </div>
            <committee-table
              [committees]="result">
            </committee-table>

           `,
  providers: [TitleService],
  directives: [ChoicesComponent, ResultComponent, CommitteeTableComponent]
})
export class CommitteeComponent {
  public startRoute:string = '/api/committees';
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