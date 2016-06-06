import {Component} from 'angular2/core';
@Component({
  selector: 'home',
  styles: [
  `
    .landing-icon {
      height: 600px;
      display: flex;
      flex-flow: column;
      flex: 2;
      align-items: center;
      justify-content: center;
    }
  `
  ],
  template: `
    <div class="landing-icon">
      <h1>www.CitizensHub.org</h1>
      <br>
      <img src="http://www.opensecrets.org/wp-content/uploads/news/assets_c/2010/06/US-WhiteHouse-Logo-thumb-220x149-1250.png" />
      <br>
      <h4>Data Driven Politics</h4>
    </div>
  `
})
export class Landing {
  constructor() {

  }
}
