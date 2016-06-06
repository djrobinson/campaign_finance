import {Component, OnInit} from 'angular2/core';
import {TitleService} from './api_services/title.service';
import {GraphService} from './api_services/graph.service';
import {CandidateComponent} from './candidate/candidate.component.ts';
import {CommitteeComponent} from './committees/committee.component';
import {ContributionsComponent} from './contributions/contributions.component';
import {DisbursementsComponent} from './disbursements/disbursements.component';
import {IndividualsComponent} from './individuals/individuals.component';
import {LegislatorsComponent} from './legislators/legislators.component';
import {MiniProfileComponent} from './graphs/mini-profile.component.ts';
import {BillPopupComponent} from './bills/bill-popup.component.ts';
import {BillsComponent} from './bills/bills.component.ts';
import {SubjectComponent} from './bills/subject.component.ts';
import {OpexComponent} from './opex/opex.component';
import {PacsComponent} from './pacs/pacs.component';
import {VotesComponent} from './votes/votes.component';
import {Landing} from './landing/landing.component';
import {GraphComponent} from './graphs/graph.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {CORE_DIRECTIVES, NgClass} from 'angular2/common';

@Component({
  selector: 'my-app',
  styles: [`
    .app {
      min-height: 100vh;
      width: 100%;
      flex-direction: row;
      align-items: stretch;
      background: #EBF5EE;
    }
    a {
      text-decoration: none;
    }
    .header {
      height: 3rem;
      text-align: center;
      font-size: 3rem;
      background: #283044;
      color: #EBF5EE;
      padding-bottom: 5rem;
      margin: 0 !important;
    }
    .header, .app, .footer {
      flex: 1 100%;
    }
    .tileContainer {

      padding: 0;
      margin: 0;

      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      width: 100%;

      -webkit-flex-flow: row;
      justify-content: space-around;
    }
    .tile {
      display: flex;
      width: 100%;
      background: #78A1BB;
      height: 5rem;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding-top: 2rem;
    }
    .tileContainer a {
      text-decoration: none;
      flex-grow: 1;
    }
    .footer {
      position: fixed;
      width: 100%;
      bottom: 0;
      text-align: center;
      font-size: 3rem;
      background-color: white;
      z-index: 2;
      border-top: solid 1px gray;
    }
  `],
  template: `
    <div class="app">
        <div class="tileContainer">
          <a [routerLink]="[title.name]"
            *ngFor="#title of titles"
            (click)="setSelected(title.id)"
            [style.color]="isSelected(title)"
            class="tile"
            >
            <div>
              <p>{{title.name}}</p>
            </div>
          </a>
      </div>
      <div class="row">
          <router-outlet></router-outlet>
      </div>
    </div>


  `,
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, CandidateComponent, NgClass],
  providers: [TitleService]
})
@RouteConfig([
  { path: '*', redirectTo: ['Landing'] },
  {
    path: '/candidates',
    as: 'Candidates',
    component: CandidateComponent
  },
  {
    path: '/contributions',
    as: 'Contributions',
    component: ContributionsComponent
  },
  {
    path: '/committees',
    as: 'Committees',
    component: CommitteeComponent
  },
  {
    path: '/disbursements',
    as: 'Disbursements',
    component: DisbursementsComponent
  },
  {
    path: '/individuals',
    as: 'Individual Contributions',
    component: IndividualsComponent
  },
  {
    path: '/pacs',
    as: 'PAC Expenditures',
    component: PacsComponent
  },
  {
    path: '/opex',
    as: 'Committee Opex',
    component: OpexComponent
  },
  {
    path: '/legislators',
    as: 'Legislators',
    component: LegislatorsComponent
  },
  {
    path: '/votes',
    as: 'Congressional Votes',
    component: VotesComponent
  },
  {
    path: '/graph',
    as: 'Graphs',
    component: GraphComponent
  },
  {
    path: '/bills',
    as: 'Bills',
    component: BillsComponent
  },
  {
    path: '/bills/:subject',
    as: 'Subject',
    component: SubjectComponent
  },
  {
    path: '/bill/:congress/:bill_id',
    as: 'Bill',
    component: BillPopupComponent
  },
  {
    path: '/',
    as: 'Landing',
    component: Landing,
    useAsDefault: true
  }
])
export class AppComponent implements OnInit {
  constructor(private _titleService: TitleService) {
  }
  getTitles() {
    this._titleService.getTitles().then(titles => this.titles = titles);
  }
  ngOnInit() {
    this.getTitles();
  }
  setSelected(id) {
    console.log(id);
    this.selected = id;
  }
  isSelected(title) {
    if (this.selected === title.id) {
      return " black";
    }
  }

}