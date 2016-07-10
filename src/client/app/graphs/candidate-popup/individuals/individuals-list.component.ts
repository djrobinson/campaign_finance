import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'individuals-list',
  template: `
    <h1>Howdy</h1>
    <ul *ngFor="#individual of individuals">
      <li>{{individual}}</li>
    </ul>
  `,
  styles: [`
    width: 100%;
    height; 100%;
    background: orange;
  `],
  directives: []
})
export class IndividualsListComponent implements OnInit {
  @Input() cmte: string;
  private individuals: any;


  constructor(private http:Http) {}

  ngOnInit(){
    this.http.get('/api/individuals/' + this.cmte + '/recipient').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.individuals = data;
    }, error => console.log('Could not load individuals.'));
  }
}