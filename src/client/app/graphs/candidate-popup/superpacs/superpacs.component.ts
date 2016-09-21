import {Component, Input, Output, OnInit} from 'angular2/core';
import {TreemapComponent} from '../../charts/treemap.component';
import {PacsListComponent} from './superpacs-list.component';
import {NgClass} from '@angular/common';

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
  private isSelected: boolean=false;
  public isFirst: boolean;

  ngOnInit() {
    this.isFirst = true;
    console.log(this.cand);
    this.route = '/api/pac/aggregate/' + this.cand.CANDIDATE_ID;
  }

  public callSuperpacs(){
    this.isSelected = !this.isSelected;
    this.showList = !this.showList;
  }

  closeInstructions(){
    console.log("Assurance");
    this.isFirst = false;
  }

}