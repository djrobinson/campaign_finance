import {Component, OnInit} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
import {TitleService} from '../api_services/title.service';
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
            .api-result {
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
                  [style.background-color]="isSelected(route.id)"
                  class="api-route">
                  <h3>{{route.name}}</h3>
                </div>
              </div>
              <div class="api-result">
                <h1>Results go here!</h1>
                <api-result></api-result>
              </div>
            </div>
           `,
  providers: [CandidateService, TitleService],
  directives: [ResultComponent]
})
export class CandidateComponent implements OnInit {
  //Not sure how to use multiple services here
  constructor(private _titleService: TitleService) { }
  setSelected(id){
    console.log(id);
    this.selected = id;
  }
  isSelected(id) {
    if (this.selected === id) return "blue";
  }
  getRoutes() {
    this._titleService.getTitles().then(titles => this.routes = titles
      .filter(title => title.id === 1 )[0].routes);
  }
  ngOnInit() {
    this.getRoutes();
  }
}
