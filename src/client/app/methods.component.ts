import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'methods',
  template: `
    <div class="funding-container">
      <h1>Methods & Resources</h1>
      <p>I will be adding an explanation of each graph throughout the site shortly. The site is still a prototype, so I will continue to make improvements.</p>
      <p>Data was last pulled on September 30th, 2016. This will include all individual transaction data through September 30th. Aggregate data will be from around August 31st, depending on the most recent financial report.</p>
      <h5>Known Issues:</h5>
      <ul>
        <li>Text overflowing throughout the app</li>
        <li>Slow load time for individual name search</li>
        <li>IE graph links are not updating properly</li>
        <li>Pictures don't show up for Congressman.</li>
        <li>Issues w/ candidate pictures on graph (Committe names cover picture)</li>
      </ul>

    </div>
  `,
  styles: [`
    .funding-container {
      font-family: 'Oswald';
      font-weight: 300;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .button {
      font-family: 'Oswald';
      font-weight: 500;
      background-color: #73877B; /* Green */
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      cursor: pointer;
      background-color: white;
      color: black;
      border: 2px solid #9DBF9E;
      border-radius: 25px;
      box-sizing: border-box;;
      width: 15%;

    }

    .button:hover {
        background-color: #9DBF9E;
        color: white;
    }
  `],
  directives: []

})
export class MethodsComponent implements OnInit {

  ngOnInit() {
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}