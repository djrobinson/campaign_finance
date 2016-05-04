import {Component, OnInit} from 'angular2/core';
import {Subject} from './subject';
import {SubjectService} from './subject.service';

@Component({
  selector: 'my-app',
  styles: [`
    .app {
      display: block;
      text-align: center;
      padding: 25px;
      background: #f5f5f5;
    }
  `],
  template: `
    <div class="app">
      <ul class="subjects">
        <li *ngFor="#subject of subjects">{{subject.name}}</li>
      </ul>
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