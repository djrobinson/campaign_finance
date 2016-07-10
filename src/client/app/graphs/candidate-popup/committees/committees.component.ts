import {Component, Input, Output, OnInit} from 'angular2/core';
import {TreemapComponent} from '../charts/treemap.component';

@Component({
  selector: 'committees-section',
  templateUrl: 'app/graphs/candidate-popup/committees/committees-partial.html',
  styleUrls: ['app/graphs/candidate-popup/committees/committees-partial.css'],
  directives: []
})
export class CommitteesSectionComponent implements OnInit {
}