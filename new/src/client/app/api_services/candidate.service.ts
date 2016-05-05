import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CandidateService {
  constructor(http:Http) {
    this.candidates = http.get('api/candidates')
      .map(response => response.json());
  }
}

// export class TestService {
//   constructor(http:Http) {
//     this.results = http.get()
//   }
// }