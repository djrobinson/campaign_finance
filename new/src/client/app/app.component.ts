import {Component, OnInit} from 'angular2/core';
import {TitleService} from './api_services/title.service';
import {CandidateComponent} from './candidate/candidate.component.ts';
import {CommitteeComponent} from './committees/committee.component';
import {ContributionsComponent} from './contributions/contributions.component';
import {DisbursementsComponent} from './disbursements/disbursements.component';
import {IndividualsComponent} from './individuals/individuals.component';
import {LegislatorsComponent} from './legislators/legislators.component';
import {OpexComponent} from './opex/opex.component';
import {PacsComponent} from './pacs/pacs.component';
import {VotesComponent} from './votes/votes.component';
import {Landing} from './landing/landing.component.ts';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'my-app',
  styles: [`
    .app {
      min-height: 100vh;
      width: 100%;
      flex-direction: row;
      align-items: stretch;
    }
    .header {
      height: 3rem;
      text-align: center;
      font-size: 3rem;
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

      width: 100%;
      background: tomato;
      height: 5rem;
      margin-top: 10px;

      line-height: 5rem;
      color: white;
      text-align: center;
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
      <div class="row">
        <div class="container-fluid header">
          <h1>Open Campaign Project</h1>
        </div>
      </div>
      <div class="tileContainer">
        <a [routerLink]="[title.name]" *ngFor="#title of titles">
          <div class="tile">
            <p>{{title.name}}</p>
          </div>
        </a>
      </div>
      <div class="row">
        <div class="container-fluid">
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="footer">
        <h1>About</h1>
      </div>
    </div>


  `,
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, CandidateComponent],
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
    path: '/',
    as: 'Landing',
    component: Landing,
    useAsDefault: true
  }
])
export class AppComponent implements OnInit {
  constructor(private _titleService: TitleService) { }
  getTitles() {
    this._titleService.getTitles().then(titles => this.titles = titles);
  }
  ngOnInit() {
    this.getTitles();
  }
}