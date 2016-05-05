import {Component} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
@Component({
  selector: 'candidate-table',
  styles: [

          ],
  template: `
              <div class="api-result">
                <ul>
                  <li *ngFor="#candidate of candidates">
                    <h2>{{candidate.can_nam}}</h2>
                  </li>
                </ul>
              </div>
           `,
  providers: [CandidateService]
})
export class CandidateComponent {
  constructor(private _candidateService:CandidateService) {
    _candidateService.candidates
      .subscribe(
        candidates => this.candidates = candidates,
        error => console.error('Error: ' + err),
        () => console.log('Completed!')
      );
  }
}