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
        position: fixed;
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
      width: 15%;
      height: 100%;
      background: white;
      z-index: 4;
    }
    .content-width {
      position: absolute;
      width: 85%;
      height: 100%;
      right: 0;
    }

  `],
  template: `
    <div class="app">
      <div *ngIf="sideMenu" id="menu">
        <p>Haldo!</p>
      </div>
      <div id="lines" (click)="showMenu()"></div>
      <div [class.content-width]="sideMenu">
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
  constructor(private _titleService: TitleService,
              private router: Router) {
  }
  public getTitles() {
    this._titleService.getTitles().then(titles => this.titles = titles);
  }
  ngOnInit() {
    this.getTitles();
  }

  private showMenu(){
    console.log("showing!");
    this.sideMenu = true;
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