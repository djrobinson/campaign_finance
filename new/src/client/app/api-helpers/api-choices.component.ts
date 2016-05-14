import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'choices',
  styles: [`


            `],
  template: `

              <div class="route-column">
                <div *ngFor="#route of routes"
                  (click)="setSelected(route.id)"
                  [style.background-color]="isSelected(route)"
                  (click)="routeClick(route.test);"
                  class="api-route">
                  <h5>{{route.name}}</h5>
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