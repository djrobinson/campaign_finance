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
    .navbar {
      position: fixed;
      display: flex;
      background: #110B11;
      justify-content: space-around;
      height: 7vh;
      width: 100%;
      border-bottom: solid 1px #EFF1F3;
      box-sizing: border-box;
    }
    .ul {
      padding-top: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      flex-grow: 1;
    }
    a {
      text-decoration: none;
      color: #EFF1F3;
    }
    .nav-title {
      width: 40%;
      text-align: center
    }
    .nav-button {
      flex-grow: 1;
      text-align: center;
      height: 5vh;
      padding-top: 1vh;
    }
    .nav-button:hover {
      background: #EFF1F3;

    }
    .nav-button:hover a {
      color: #110B11;
    }
  `],
  template: `
    <div class="app">
      <div class="navbar">
        <div class="ul">
            <div class="nav-button"><h5><a href="#">About</a></h5></div>
            <div class="nav-button"><h5><a href="#">Presidential Candidates</a></h5></div>
            <div class="nav-button"><h5><a href="#">Super PACs</a></h5></div>
        </div>
        <div class="nav-title">
          <h2><a href="#">Citizens Hub</a></h2>
        </div>
        <div class="ul">
            <div class="nav-button"><h5><a href="#">Senators</a></h5></div>
            <div class="nav-button"><h5><a href="#">House Representatives</a></h5></div>
            <div class="nav-button"><h5><a href="#">Support</a></h5></div>
        </div>
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