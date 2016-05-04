import {Component, OnInit} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
@Component({
  selector: 'candidate-view',
  template: `
            <h1>Candidate!!!</h1>
            <p>{{candidates}}</p>

           `
    ,
  providers: [CandidateService]
})
export class CandidateComponent implements OnInit {
  constructor(private _candidateService:CandidateService) {
    _candidateService.candidates
      .subscribe(
        candidates => this.candidates = candidates,
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
  }
}
