import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {TitleService} from '../api_services/title.service';
import {ChoicesComponent} from '../api-helpers/api-choices.component';
import {ResultComponent} from '../api-helpers/api-result.component';
// import {CandidateTableComponent} from './candidate-table.component';

@Component({
  selector: 'votes-view',
  template: `
            <h1>Votes Coming Soon.</h1>

           `,
  providers: [TitleService],
  directives: [ChoicesComponent, ResultComponent]
})
export class VotesComponent {
  public startRoute:string = '/api/votes';
  constructor(private _titleService: TitleService) {  }
  setSelected(id){
    console.log(id);
    this.selected = id;
  }
  newRoute(event){
    console.log(event);
    this.getJson(event.value);
    this.currentRoute=event.value;
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

/* Below is the original template once mongolab is set up */
            // <div class="row">
            //   <choices
            //     [apiId]="9"
            //     [currentRoute]="startRoute"
            //     (routeChange)="newRoute($event);"
            //     class="one-third column">
            //   </choices>
            //   <api-result
            //     [currentRoute]="currentRoute"
            //     [result]="result"
            //     class="two-thirds column">
            //   </api-result>
            // </div>