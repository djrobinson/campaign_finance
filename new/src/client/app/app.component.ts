import {Component, OnInit} from 'angular2/core';
// import {Subject} from './subject';
import {SubjectService} from './api_services/subject.service';
import {CandidateComponent} from './candidate/candidate.component.ts';
import {CommitteeComponent} from './committees/committee.component';
import {ContributionsComponent} from './contributions/contributions.component';
import {DisbursementsComponent} from './disbursements/disbursements.component';
import {IndividualsComponent} from './individuals/individuals.component';
import {LegislatorsComponent} from './legislators/legislators.component';
import {OpexComponent} from './opex/opex.component';
import {PacsComponent} from './pacs/pacs.component';
import {TransfersComponent} from './transfers/transfers.component';
import {VotesComponent} from './votes/votes.component';
import {Landing} from './landing/landing.component.ts';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'my-app',
  styles: [`
    .app {
      display: flex;
      flex-flow: row wrap;
      min-height: 100vh;
    }
    .header, .app, .footer {
      flex: 1 100%;
    }
    .tileContainer {
      order: 1;
      background: #f5f5f5;
    }
    .tile {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      text-align: center;
      flex-wrap: wrap;

      background: #7A8B99;
      color: #A9DDD6;
      font-family: "Courier New", Courier, monospace;
    }
    .tileContainer a {
      text-decoration: none;
    }
    main {
      flex: 2 0px;
      order: 2;
    }
    .footer {
      align-self: flex-end;
      order: 4;
    }


  `],
  template: `
    <div class="app">
      <div class="header">
        <h1>Campaign Finance</h1>
      </div>
      <div class="tileContainer">
        <a [routerLink]="[subject.name]" *ngFor="#subject of subjects">
          <div class="tile" >
            <h2>{{subject.name}}</h2>
          </div>
        </a>
      </div>
      <main>
        <router-outlet></router-outlet>
      </main>
      <div class="footer">
        <h1>About</h1>
      </div>
    </div>


  `,
  directives: [ROUTER_DIRECTIVES, CandidateComponent],
  providers: [SubjectService]
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
    path: '/transfers',
    as: 'Committee Transfers',
    component: TransfersComponent
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
  constructor(private _subjectService: SubjectService) { }
  getHeroes() {
    this._subjectService.getSubjects().then(subjects => this.subjects = subjects);
  }
  ngOnInit() {
    this.getHeroes();
  }
}