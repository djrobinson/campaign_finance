import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
  constructor(http:Http) {
    this.http = http;
  }
  getResult(cand, size) {
    return this.http.get('api/graph/test/' + cand + '/' + size )
      .map(response => response.json());
  }
  getCommitteeDonors(cmte) {
    console.log("committee donors is runnign! ", cmte);
    // return this.http.get('api/graph/' + cmte + '/committee')
    return this.http.get('api/graph/test/'+ cmte)
      .map(response => response.json());
  }
}