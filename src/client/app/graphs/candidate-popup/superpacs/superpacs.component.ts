import {Component, Input, Output, OnInit} from 'angular2/core';
import {TreemapComponent} from '../../charts/treemap.component';

@Component({
  selector: 'superpacs-section',
  templateUrl: 'app/graphs/candidate-popup/superpacs/superpacs-partial.html',
  styleUrls: ['app/graphs/candidate-popup/superpacs/superpacs-partial.css'],
  directives: [TreemapComponent]
})
export class SuperpacsSectionComponent implements OnInit {
  public route = string;

}