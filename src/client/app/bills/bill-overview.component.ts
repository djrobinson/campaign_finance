import {Component, Input} from 'angular2/core';

@Component({
  selector: 'bill-overview',
  template: `
                <div class="title-container row">
                  <h2>Bill Overview</h2>
                  <h3>{{overview.official_title}}</h3>
                  <h5>{{overview.subjects_top_term}}</h5>
                  <h5>{{overview.bill_id}}</h5>
                </div>
                <div class="cosponsors-container row">
                  <div class="cosponsor" *ngFor="#sponsor of overview.cosponsors">
                    <p>{{sponsor.name}}</p>
                    <p>{{sponsor.sponsored_at}}</p>
                  </div>
                </div>
                <div class="actions-container row">
                  <div class="action" *ngFor="#action of overview.actions">
                    <p>{{action.text}}</p>
                  </div>
                </div>
  `,
  styles: [`
    .cosponsors-container {
      width: 100%;
    }
    .title-container {
      text-align: center;
    }
    .cosponsor {
      width: 15%;
      display: inline-block;
      vertical-align: top;
      border: solid 1px gray;
    }
  `],
  directives: []
})
export class BillOverviewComponent {
  //May want to start creating individual/committee types.
  @Input() overview: string;

}