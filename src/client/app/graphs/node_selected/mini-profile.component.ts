import {Component} from 'angular2/core';
import {TitleService} from '../../api_services/title.service';
@Component({
  selector: 'mini-profile-view',
  template: `
    <h1>Legislators Coming Soon.</h1>
    <p>{{cand_id}}</p>
  `
})
export class MiniProfileComponent {
  @Inputs() cand_id;
  constructor(private _TitleService: TitleService) {

  }
}
