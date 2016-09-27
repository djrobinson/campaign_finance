import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'about',
  template: `
    <div class="funding-container">

      <h1>About this Project</h1>
      <div class="about-container">
        <p>Citizens Hub is part of a data project to visualize how funds exchange hands in our government. It is a compilation of public financial data from several different sources that creates donor maps for a candidate. The aim is to make it easier to understand the big picture of how campaign finance works. I'm still working on the project, so feel free to send any usability suggestions to danny@citizenshub.org.</p>
      </div>
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
    .about-container {
      width: 30%;
      text-align: justify;
    }
    .about-container p {
      font-size: 2rem;
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
export class AboutComponent implements OnInit {

  ngOnInit() {
  }

  public openFec(){
    window.open('http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016');
  }

}