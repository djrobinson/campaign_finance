import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'choices',
  styles: [`
            .api-route {
              display: flex;
              width: 100%;
              height:4rem;
              justify-content: space-around;
              flex-direction: column;
              background: #963D5A;
              margin: 1rem;
            }
            .route-column {
              width: 100%;
            }
            `],
  template: `
            <div class="wrapper">
              <div class="route-column">
                <div *ngFor="#route of routes"
                  (click)="setSelected(route.id)"
                  [style.background-color]="isSelected(route)"
                  (click)="routeClick(route.test);"
                  class="api-route">
                  <h3>{{route.name}}</h3>
                </div>
              </div>
            </div>
           `,
  providers: [TitleService]
})
export class ChoicesComponent implements OnInit {
  @Input() apiId = 0;
  @Input() currentRoute = '';
  @Output() routeChange = new EventEmitter();

  routeClick(name) {
    this.counterValue++;
    this.routeChange.emit({
      value: name
    })
  }

  constructor(private _titleService: TitleService) {  }
  setSelected(id){
    console.log(id);
    this.selected = id;
  }
  isSelected(route) {
    if (this.selected === route.id){
       this.startRoute = route.test;
      return "blue";
    }
  }

  getRoutes(id) {
    this._titleService.getTitles().then(titles => this.routes = titles
      .filter(title => title.id === id )[0].routes);
  }

  ngOnInit(){
    this.getRoutes(this.apiId);
  }

}