import {Component, OnInit} from 'angular2/core';
import {Subject} from './subject';
import {SubjectService} from './subject.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
  selector: 'my-app',
  styles: [`
    .app {
      display: block;
      position: absolute;
      padding: 25px;
      background: #f5f5f5;
      text-align: center;
      height: 100%;
    }
    .tile {
      display: inline-flex;
      justify-content: space-around;
      flex-direction: row;
      text-align: center;
      flex-wrap: wrap;
      width: 15%;
      height: 8rem;

      margin: .5rem;
      background: #7A8B99;
      color: #A9DDD6;
      font-family: "Courier New", Courier, monospace;
    }

  `],
  template: `
    <div class="app">
      <a href="subject.link">
        <div class="tile" *ngFor="#subject of subjects" (click)="onClick(subject.id)">
          <h2>{{subject.name}}</h2>
        </div>
      </a>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [SubjectService, ROUTER_PROVIDERS]
})
// @RouteConfig([
//   {
//     path: '/dashboard',
//     name: 'Dashboard',
//     component: DashboardComponent,
//     useAsDefault: true
//   }
// ])
export class AppComponent implements OnInit {
  subjects: Subject[];
  constructor(private _subjectService: SubjectService) { }
  getHeroes() {
    this._subjectService.getSubjects().then(subjects => this.subjects = subjects);
  }
  ngOnInit() {
    console.log("on init is running first")

    this.getHeroes();
  }
}