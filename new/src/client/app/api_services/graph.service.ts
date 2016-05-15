import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
  constructor(http:Http) {
    this.http = http;
  }
  getResult(cand) {
    return this.http.get('api/graph/'+cand+'/candidate')
      .map(response => response.json());
  }
}