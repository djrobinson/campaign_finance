import {Component, OnInit, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'candidates-view',
  styleUrls: ['app/candidates/candidates.css'],
  templateUrl: 'app/candidates/candidates.html',
  directives: []
})
export class CandidatesComponent implements OnInit {
  private candidates: string;
  @Input() type: string;
  constructor() {

  }

  ngOnInit() {

  }
}