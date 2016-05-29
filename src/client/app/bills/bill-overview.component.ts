import {Component, Input} from 'angular2/core';

@Component({
  selector: 'bill-overview',
  template: `
                <h2>Bill Overview</h2>
                <h3>{{overview.official_title}}</h3>
                <h5>{{overview.subjects_top_term}}</h5>
                <h5>{{overview.bill_id}}</h5>
                <ul>
                  <li *ngFor="#sponsor of overview.cosponsors">
                    <p>{{sponsor.name}}</p>
                  </li>
                </ul>
                <ul>
                  <li *ngFor="#action of overview.actions">
                    <p>{{action.text}}</p>
                  </li>
                </ul>
  `,
  styles: [`

  `],
  directives: []
})
export class BillOverviewComponent {
  //May want to start creating individual/committee types.
  @Input() overview: string;

}