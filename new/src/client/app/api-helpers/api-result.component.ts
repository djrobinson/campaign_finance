import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'api-result',
  styles: [`
            .result {
              overflow: scroll;
            }
          `],
  template: `
              <div class="result">
                <button (click)="routeClick();" class="counter__button">Clicky click</button>
                <h2>{{currentRoute}}</h2>
              </div>
           `,
  providers: [TitleService]
})
export class ResultComponent {
  @Input() currentRoute = '';
  @Output() routeChange = new EventEmitter();
  constructor(private _titleService:TitleService) {
    this._titleService = _titleService;
  }

  routeClick() {
    this.counterValue++;
    this.routeChange.emit({
      value: '/api/api'
    })
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