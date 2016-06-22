import {Component, OnInit} from 'angular2/core';
import {TitleService} from './api_services/title.service';
import {GraphService} from './api_services/graph.service';
import {CandidateComponent} from './candidate/candidate.component.ts';
import {CommitteeComponent} from './committees/committee.component';
import {MiniProfileComponent} from './graphs/mini-profile.component.ts';
import {Landing} from './landing/landing.component';
import {GraphComponent} from './graphs/graph.component';
import {SpinnerComponent} from './loading/spinner.component';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CORE_DIRECTIVES, NgClass} from 'angular2/common';
import {RouteParams} from 'angular2/router';

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

    .flexrow {
      text-align: center;
      padding-top: 4px;
      padding-left: 4px;
      border-bottom: solid 1px #ABA4A3;
    }
    .flexrow h4 {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .flexrow p {
      margin: 0;
      padding: 0;
    }
  `],
  template: `
    <div class="app">
      <div class="flexrow" (click)="graphs()">
          <h4>Citizens Hub</h4>
          <p>Alpha</p>
      </div>
      <router-outlet></router-outlet>
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
    path: '/committees',
    as: 'Committees',
    component: CommitteeComponent
  },
  {
    path: '/graph',
    as: 'Graphs',
    component: GraphComponent
  },
  {
    path: '/',
    as: 'Landing',
    component: Landing,
    useAsDefault: true
  }
])
export class AppComponent implements OnInit {
  constructor(private _titleService: TitleService,
              private router: Router) {
  }
  public getTitles() {
    this._titleService.getTitles().then(titles => this.titles = titles);
  }
  ngOnInit() {
    this.getTitles();
  }
  private setSelected(id) {
    console.log(id);
    this.selected = id;
  }
  private isSelected(title) {
    if (this.selected === title.id) {
      return " black";
    }
  }
  public graphs(): void {
    this.router.navigate(['Landing']);
  }

}