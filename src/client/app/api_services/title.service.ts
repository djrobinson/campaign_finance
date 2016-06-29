import {Injectable} from 'angular2/core';
// import {TITLES} from '../titles-list';
import {Http, Response} from 'angular2/http';

@Injectable()
export class TitleService {
  constructor(http:Http) {
    this.http = http;
  }

  getTitles() {
    return Promise.resolve(TITLES);
  }

  getResult(route) {
    return this.http.get(route)
        .map(response => response.json());
    }
  }
}