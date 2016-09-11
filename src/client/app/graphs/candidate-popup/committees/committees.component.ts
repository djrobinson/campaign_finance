import {Component, Input, Output, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'committees-section',
  templateUrl: 'app/graphs/candidate-popup/committees/committees-partial.html',
  styleUrls: ['app/graphs/candidate-popup/committees/committees-partial.css'],
  directives: []
})
export class CommitteesSectionComponent implements OnInit {
  @Input() cmte: string;
  private committees: any;

  constructor(private http:Http) {

  }

  public parseFloat = function(num){
    return parseFloat(num);
  }

  ngOnInit(){
    console.log(this.cmte);
    this.http.get('/api/transfers/' + this.cmte + '/recipient').map(response => response.json()).subscribe(data => {
      console.log(data);
      this.committees = data;
    }, error => console.log('Could not load committees.'));
  }
}
