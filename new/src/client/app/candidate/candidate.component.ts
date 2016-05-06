import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
import {TitleService} from '../api_services/title.service';
import {AsyncPipe } from 'angular2/common';
import {ResultComponent} from '../api-helpers/api-result.component';
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
              <h1>Candidate API Routes</h1>
                <div *ngFor="#route of routes"
                  (click)="setSelected(route.id)"
                  [style.background-color]="isSelected(route)"
                  class="api-route">
                  <h3>{{route.name}}</h3>
                  <h2>{{currentRoute}}</h2>
                </div>
              </div>
              <div class="result">
                 <api-result [currentRoute]="startRoute" (routeChange)="newRoute($event)"></api-result>
              </div>
            </div>
           `,
  providers: [CandidateService, TitleService],
  directives: [ResultComponent],
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
      return "blue";
    }
  }
  newRoute(event){
    console.log(event);
  }
  getRoutes() {
    this._titleService.getTitles().then(titles => this.routes = titles
      .filter(title => title.id === 1 )[0].routes);
  }
  ngOnInit() {
    this.getRoutes();
  }
}
