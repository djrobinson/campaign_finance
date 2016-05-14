import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
  constructor(http:Http) {
    this.http = http;
  }
  getResult() {
    return this.http.get('api/graph/P00003392')
      .map(response => response.json());
  }
}