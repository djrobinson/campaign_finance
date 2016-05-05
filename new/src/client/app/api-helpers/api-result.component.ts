import {Component, Input} from 'angular2/core';
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
                <pre>{{result | json}}</pre>
              </div>
           `,
  providers: [TitleService]
})
export class ResultComponent {
  constructor(private _titleService:TitleService) {
    this._titleService = _titleService;
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