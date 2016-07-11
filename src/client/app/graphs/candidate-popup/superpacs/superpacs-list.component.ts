import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'superpacs-list',
  template: `
    <h1>Howdy</h1>
    <ul *ngFor="#pac of pacs">
      <li>{{pac.can_id}}</li>
    </ul>
  `,
  styles: [`
    width: 100%;
    height; 100%;
  `],
  directives: []
})
export class PacsListComponent implements OnInit {
  @Input() cand: any;
  private pacs: any;

  constructor(private http:Http) {}

  ngOnInit(){
    this.http.get('/api/pac/' + this.cand.CANDIDATE_ID + '/candidate').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.pacs = data;
    }, error => console.log('Could not load individuals.'));
  }
}