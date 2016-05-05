import {Injectable} from 'angular2/core';
import {TITLES} from '../titles-list';
import {Http, Response} from 'angular2/http';

@Injectable()
export class TitleService {
  constructor(http:Http) {
    this.http = http;
  }
  getTitles() {
    return Promise.resolve(TITLES);
  }

  getResult() {
    return this.http.get('api/candidates')
        .map(response => response.json());
    }
  }
}