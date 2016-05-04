import {Component, OnInit} from 'angular2/core';
import {Subject} from './subject';
import {SubjectService} from './subject.service';
import {CandidateComponent} from './candidate/candidate.component.ts';
import {Landing} from './landing/landing.component.ts';
import { RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'my-app',
  styles: [`
    .app {
      display: block;
      position: absolute;
      padding: 25px;
      background: #f5f5f5;
      text-align: center;
      height: 90%;
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
      <a [routerLink]="['/Candidates']" *ngFor="#subject of subjects">
        <div class="tile" >
          <h2>{{subject.name}}</h2>
        </div>
      </a>
      <landing></landing>
      <candidate-view></candidate-view>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>

  `,
  directives: [ROUTER_DIRECTIVES, CandidateComponent],
  providers: [SubjectService]
})
@RouteConfig([
  {
    path: '/candidates',
    as: 'Candidates',
    component: CandidateComponent
  },
  {
    path: '/landing',
    as: 'Landing',
    component: Landing,
    useAsDefault: true
  }
])
export class AppComponent implements OnInit {
  subjects: Subject[];
  constructor(private _subjectService: SubjectService) { }
  getHeroes() {
    this._subjectService.getSubjects().then(subjects => this.subjects = subjects);
  }
  ngOnInit() {
    this.getHeroes();
  }
}