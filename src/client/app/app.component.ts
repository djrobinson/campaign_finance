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
    #lines {
      position: absolute;
      top: 2rem;
      left: 2rem;
      z-index: 3;
      border-bottom: 17px double #6C6F7D;
      border-top: 6px solid #6C6F7D;
      content:"";
      height: 5px;
      width:30px;
    }
    #menu {
      display: flex;
      position: fixed;
      width: 17%;
      height: 100%;
      background: #364760;
      z-index: 4;
      flex-direction: column;
    }
    .content-width {
      position: absolute;
      width: 83%;
      height: 100%;
      right: 0;
    }
    .menu-option {
      display: flex;
      height: 7%;
      width: 100%;
      color: #EFF1F3;
      align-items: center;
    }
    .menu-option h5 {
      padding: 0;
      margin: 0;
      padding-left: 1rem;
    }
    .menu-option:first-child {
      background: #2A394F;
      justify-content: center;
    }
    .menu-option:hover {
      background: #110B11;

    }
  `],
  template: `
    <div class="app">
      <div *ngIf="sideMenu" id="menu">
        <div class="menu-option"><h5>Home</h5></div>
        <div class="menu-option"><h5>About</h5></div>
        <div class="menu-option"><h5>Presidential Funding</h5></div>
        <div class="menu-option"><h5>Super PACs</h5></div>
        <div class="menu-option"><h5>Senate Funding</h5></div>
        <div class="menu-option"><h5>House Funding</h5></div>
      </div>

      <div [class.content-width]="sideMenu">
        <div id="lines" (click)="showMenu()"></div>
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
  public sideMenu: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  private showMenu(): void{
    this.sideMenu = !this.sideMenu;
  }

  public graphs(): void {
    this.router.navigate(['Landing']);
  }

}