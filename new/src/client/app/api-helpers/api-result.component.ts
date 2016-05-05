import {Component} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
@Component({
  selector: 'api-result',
  styles: [

          ],
  template: `
              <div class="result">
                {{result}}
              </div>
           `,
  providers: [TitleService]
})
export class ResultComponent {
  constructor(private _titleService:TitleService) {
    _titleService.getResult()
      .subscribe(
        result => this.result = result,
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
  }
}