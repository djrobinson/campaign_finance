import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
import {TitleService} from '../api_services/title.service';
import {CandidateChoices} from './candidate-choices.component';
import {ResultComponent} from '../api-helpers/api-result.component';
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
            .result {
              display: flex;
              order: 2;
            }
            .wrapper {
              display: flex;
            }
            `],
  template: `
            <div class="wrapper">
              <div class="route-column">
               <h1>{{currentRoute}}</h1>
              </div>

              <candidate-choices [currentRoute]="startRoute" (routeChange)="newRoute($event);"></candidate-choices>
              <api-result [currentRoute]="currentRoute"></api-result>
            </div>
           `,
  providers: [CandidateService, TitleService],
  directives: [CandidateChoices, ResultComponent],
  pipes: [AsyncPipe]
})
export class CandidateComponent implements OnInit {
  public startRoute:string = '/api/candidates';
  constructor(private _titleService: TitleService) {  }
  setSelected(id){
    console.log(id);
    this.selected = id;
  }
  isSelected(route) {
    if (this.selected === route.id){
       this.startRoute = route.name;
      return "blue";
    }
  }
  newRoute(event){
    console.log(event);
    this.currentRoute=event.value;
  }
  getRoutes() {
    this._titleService.getTitles().then(titles => this.routes = titles
      .filter(title => title.id === 1 )[0].routes);
  }
  ngOnInit() {
    this.getRoutes();
  }
}
