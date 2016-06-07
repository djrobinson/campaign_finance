import {Component} from 'angular2/core';
@Component({
  selector: 'home',
  styles: [
  `
    .row {
      background-color: #17324f;
    }

    .landing-container {
      color: #17324f;
      height: 100vh;
      width: 100%;
    }

    #oval {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50rem;
      height: 30rem;
      margin: 10% auto;
      background: #CBCED2;
      -moz-border-radius: 25rem / 15rem;
      -webkit-border-radius: 25rem / 15rem;
      border-radius: 25rem / 15rem;
    }

    .campaign {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #16191F;
      height: 200px;
      color: #CBCED2;
    }

    .text-center {
      text-align: center;
    }


  `
  ],
  template: `

    <div class="landing-container">
      <div class="row">
          <div class="twelve columns text-center">
            <div id="oval">
              <div class="title">
                <h1>Citizens Hub</h1>
                <h4>Data Driven Politics</h4>
              </div>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="six columns text-center">
          <div class="campaign six columns offset-by-three">
            <h4>Campaign Finances</h4>
          </div>
        </div>
        <div class="six columns text-center">
          <div class="campaign six columns offset-by-three">
            <h4>Lobbyists & Legislation</h4>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Landing {
  constructor() {

  }
}
