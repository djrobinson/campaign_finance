import {Component} from 'angular2/core';
import {CandidateService} from '../api_services/candidate.service';
@Component({
  selector: 'candidate-view',
  styles: [
            `
            .api-route {
              display: flex;
              justify-content: space-around;
              flex-direction: column;
              background: #963D5A;
              margin: 1rem;
            }
            .route-column {
              order: 1;
            }
            .api-result {
              display: flex;
              order: 2;
            }
            .wrapper {
              display: flex;
            }
            `
          ],
  template: `
            <div class="wrapper">
              <div class="route-column">
              <h1>Candidate API Routes</h1>
                <div (click)="setSelected()" class="api-route">
                  <h2>/api/candidates/</h2>
                </div>
                <div class="api-route">
                  <h2>/api/candidates/{candidate_id}</h2>
                </div>
                <div class="api-route">
                  <h2>/api/candidates/sort/{column_name}</h2>
                </div>
                <div class="api-route">
                  <h2>/api/candidates/{candidate_id}/committees</h2>
                </div>
              </div>
              <div class="api-result">
                <h1>Results go here!</h1>
              </div>
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
  // setSelected(){
  //   this
  // }
}
