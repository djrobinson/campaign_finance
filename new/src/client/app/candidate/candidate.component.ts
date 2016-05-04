import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
@Component({
  selector: 'candidate-view',
  template: '<h1>Candidate!!!</h1>'
    ,
  providers: []
})
export class CandidateComponent implements OnInit {
  ngOnInit() {
    console.log("We have entered the candidate component!!!");
  }
}
