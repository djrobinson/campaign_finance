import {Component, OnInit} from 'angular2/core';
import {Subject} from './subject';
import {SubjectService} from './subject.service';

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
      <div class="tile" *ngFor="#subject of subjects"><h2>{{subject.name}}</h2></div>
    </div>
  `,
  providers: [SubjectService]
})
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