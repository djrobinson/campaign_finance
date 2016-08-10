import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
  constructor(http:Http) {
    this.http = http;
  }
  getResult(cand) {
    return this.http.get('api/graph/test/' + cand )
      .map(response => response.json());
  }
  getCommitteeDonors(cmte) {
    console.log("committee donors is runnign! ", cmte);
    return this.http.get('api/graph/' + cmte + '/committee')
      .map(response => response.json());
  }
}