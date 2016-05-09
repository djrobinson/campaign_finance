import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'api-result',
  styles: [`
            .result {
              display: flex;
              overflow: scroll;
              position:absolute;
              height: 100%;
            }
          `],
  template: `
              <div class="result">
                <pre>{{result | json}}</pre>
              </div>
           `,
  providers: [TitleService]
})
export class ResultComponent {
  @Input() result: string;
  @Input() currentRoute = '';
  @Output() routeChange = new EventEmitter();
  constructor(private _titleService:TitleService) {
    this._titleService = _titleService;
  }
}