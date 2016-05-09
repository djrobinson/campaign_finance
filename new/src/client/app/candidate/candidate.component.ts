import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
import {TitleService} from '../api_services/title.service';
import {CandidateChoices} from './candidate-choices.component';
import {ResultComponent} from '../api-helpers/api-result.component';
import {CandidateTableComponent} from './candidate-table.component';
import {AsyncPipe } from 'angular2/common';

@Component({
  selector: 'candidate-view',
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
            <div class="wrapper">
              <div class="route-column">
                <candidate-choices
                  [currentRoute]="startRoute"
                  (routeChange)="newRoute($event);">
                </candidate-choices>
              </div>
              <api-result
                [currentRoute]="currentRoute"
                [result]="result">
              </api-result>
            </div>
            <candidate-table
              [candidates]="result">
            </candidate-table>

           `,
  providers: [CandidateService, TitleService],
  directives: [CandidateChoices, ResultComponent, CandidateTableComponent],
  pipes: [AsyncPipe]
})
export class CandidateComponent {
  public startRoute:string = '/api/candidates';
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
