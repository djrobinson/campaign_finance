import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'about',
  template: `
    <div class="funding-container">

      <h1>About this Project</h1>
      <div class="about-container">

        <p>Citizens Hub began out of my personal frustration with the current presidential election. I started the year trying to thoroughly research each candidate, but I found that becoming an informed voter was actually pretty difficult to accomplish. Typical news sources were too biased, candidate statements were always empty, and the information provided by the government was nightmarishly boring and incomprehensible to most voters.</p>

        <p>After sifting through campaign spending data I had an idea for a high-level political data dashboard similar to stock market analysis tools using only data pulled directly from government sites. Citizens Hub is a collection of publicly available government data that has been transformed into interactive graphical representations. The beta version currently contains the past 2 years of campaign donations and spending, which paints a high level picture of who the top donors are for each candidate and political action committee. I plan to expand the project to include lobbyist spending, congressional voting history, government contract data, and historical data for all congressional actions.</p>

        <p>If you like the idea, please give to the crowdfunding campaign or email me if you would like to contribute in some other way. I would love to hear your feedback on how I can make the app more usable and what new features people are most interested in seeing. This is a personal project that is still a prototype, so I expect some bugs to pop up. Any bug reports and typo fixes would be appreciated. For bugs, inaccuracies, and usability concerns please send an email to <a href="mailto:admin@citizenshub.org" target="_top">admin@citizenshub.org</a>, and I will add them to the known issues and address them in order of urgency. For any feature suggestions, feedback, or general inquiries please email me at <a href="mailto:danny@citizenshub.org" target="_top">danny@citizenshub.org</a>.</p>
        <div class="text-right">
          <h5>-Danny Robinson</h5>
        </div>

        <p>Note - I highly suggest viewing this site in Chrome. Data visualizations are very slow/buggy in other browsers for large datasets.</p>
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
      padding-top: 2%;
    }
    .about-container {
      padding-top: 3%;
      width: 70%;
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

    .text-right {
      width: 100%;
      text-align: right;

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