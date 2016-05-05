import {Injectable} from 'angular2/core';
import {TITLES} from '../titles-list';
@Injectable()
export class TitleService {
  getTitles() {
    return Promise.resolve(TITLES);
  }
}