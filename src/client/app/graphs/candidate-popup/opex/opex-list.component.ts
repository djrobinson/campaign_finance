import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'opex-list',
  template: `
    <h1>Howdy</h1>
    <ul *ngFor="#opex of opexes">
      <li>{{opex.CMTE_ID}}</li>
    </ul>
  `,
  styles: [`
    width: 100%;
    height; 100%;
  `],
  directives: []
})
export class OpexListComponent implements OnInit {
  @Input() cmte: string;
  private opexes: any;

  constructor(private http:Http) {}

  ngOnInit(){
    this.http.get('/api/opex/committee/' + this.cmte ).map(response => response.json()).subscribe(data => {
      console.log(data);
      this.opexes = data;
    }, error => console.log('Could not load individuals.'));
  }
}