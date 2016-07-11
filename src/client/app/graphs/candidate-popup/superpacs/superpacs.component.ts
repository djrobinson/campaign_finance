import {Component, Input, Output, OnInit} from 'angular2/core';
import {TreemapComponent} from '../../charts/treemap.component';
import {PacsListComponent} from './superpacs-list.component';

@Component({
  selector: 'superpacs-section',
  templateUrl: 'app/graphs/candidate-popup/superpacs/superpacs-partial.html',
  styleUrls: ['app/graphs/candidate-popup/superpacs/superpacs-partial.css'],
  directives: [TreemapComponent, PacsListComponent]
})
export class SuperpacsSectionComponent implements OnInit {
  @Input() cand: any;
  private route: string;
  private showList: boolean=false;

  ngOnInit() {
    console.log(this.cand);
    this.route = '/api/pac/aggregate/' + this.cand.CANDIDATE_ID;
  }

  public callSuperpacs(){
    this.showList = !this.showList;
  }

}