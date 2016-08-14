import {Component, OnInit} from 'angular2/core';
import {GraphService} from './api_services/graph.service';
import {CandidatesComponent} from './candidates/candidates.component';
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
        <div class="menu-option" (click)="home()"><h5>Home</h5></div>
        <div class="menu-option"><h5>About</h5></div>
        <div class="menu-option" (click)="candPath('P')"><h5>Presidential Funding</h5></div>
        <div class="menu-option"><h5>Super PACs</h5></div>
        <div class="menu-option" (click)="candPath('S')"><h5>Senate Funding</h5></div>
        <div class="menu-option" (click)="candPath('H')"><h5>House Funding</h5></div>
      </div>

      <div [class.content-width]="sideMenu">
        <div id="lines" (click)="showMenu()"></div>
        <router-outlet></router-outlet>
      </div>
    </div>


  `,
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, NgClass]
})
@RouteConfig([
  { path: '*', redirectTo: ['Landing'] },
  {
    path: '/graph/:id',
    as: 'Graphs',
    component: GraphComponent
  },
  {
    path: '/candidates/:type',
    as: 'Candidates',
    component: CandidatesComponent
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

  public home(): void {
    this.router.navigate(['Landing']);
  }

  public candPath(typeVar): void {
    console.log("inbound");
    this.router.navigate(['Candidates', { type: typeVar } ]);
    this.sideMenu = false;
  }

}