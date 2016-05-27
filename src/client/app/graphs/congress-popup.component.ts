import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';
import {TreemapComponent} from './charts/treemap.component';
import {PieComponent} from './charts/pie-chart.component';

@Component({
  selector: 'congress-popup',
  template: `
    <div class="cand-style">
      <div class="row">
        <div class="three columns">
            <h5>Sources of Funds</h5>
          <div class="table-div">
            <ul>
              <li *ngFor="#contribution of contributions">{{contribution.NAME}}: {{contribution.TRANSACTION_AMT}}</li>
            </ul>
          </div>
        </div>

        <div class="one-half column">
          <h2>{{candidate?.CANDIDATE_NAME}}</h2>
          <div class="row">
            <div class="four columns">
              <img [src]="imageVar?.image" alt="picture">
            </div>
            <div class="eight columns">
              <p>Office Sought: {{candidate?.CANDIDATE_OFFICE}}</p>
              <p>Hometown: {{candidate?.can_cit}}, {{candidate?.STATE}}</p>
              <p>Birthdate: {{candidateInfo?.bio?.birthday}}</p>
              <p>Gender: {{candidateInfo?.bio?.gender}}</p>
              <p>Religion: {{candidateInfo?.bio?.religion}}</p>
              <p><a [href]="candidate?.lin_ima">FEC Filing Link</a></p>
            </div>
          </div>
          <div class="row">
            <div class="six columns">
              <p><em>Begin Cash: </em> {{parseFloat(candidate?.cas_on_han_clo_of_per) | currency:'USD':true}}</p>
              <p><em>End Cash: </em> {{parseFloat(candidate?.cas_on_han_clo_of_per) | currency:'USD':true}}</p>
              <p><em>Debt: </em> {{parseFloat(candidate?.deb_owe_by_com) | currency:'USD':true}}</p>
              <p><em>Funding from Candidate: </em> {{parseFloat(candidate?.can_con) | currency:'USD':true}}</p>
            </div>
            <div class="six columns">
              <p><em>Net Contributions: </em> {{parseFloat(candidate?.net_con) | currency:'USD':true}}</p>
              <p><em>Net Opex: </em> {{parseFloat(candidate?.net_ope_exp) | currency:'USD':true}}</p>
              <p><em>Distributions: </em> {{parseFloat(candidate?.tot_dis) | currency:'USD':true}}</p>
            </div>
          </div>
        </div>
        <div class="three columns">
            <h1>After Row</h1>
        </div>
      </div>
      <div class="row">
        <div class="three columns chart">
          <div class="votesChart">
          </div>
        </div>
        <div class="three columns">
          <div class="table-div">
            <ul>
              <li *ngFor="#item of disbursements">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="three columns">
          <div class="table-div">
            <ul>
              <li *ngFor="#item of yeaVotes">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    <div class="row indiv twelve columns">
      <button (click)="close()">Close</button>
    </div>
  </div>
  `,
  directives: [TreemapComponent, PieComponent],
  styles: [`
    .cand-style {
      text-align: center;
      font-size: 10px;
    }
    div {
      border: solid 1px #75717B;
    }
    img {
      width: 100%;
    }
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      font-size: 8px;
    }
    .table-div {
      height: 300px;
      overflow: scroll;
    }
    .votes {
      width: 100%;
    }
    .chart {
      height: 400px;
    }
  `]
})
export class CongressPopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Output() exitEmit = new EventEmitter();
  @ViewChild(PieComponent)
  private pieComponent: PieComponent;
  private disbursements: Object;
  private candidateInfo: Object;
  private imageVar: Object;
  private associatedCommittees: {};


  constructor(private _TitleService: TitleService,
    private http: Http) {

    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit() {
    // this.buildTreeMap();
    // this.buildPieChart();
    this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
      this.candidateInfo = data[0];

        this.callApis(this.candidate, this.candidateInfo.id.bioguide, this.candidateInfo.id.thomas, this.candidateInfo.id.lis);
        this.imageVar = {};
        this.imageVar.image = "https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/" + this.candidateInfo.id.bioguide + ".jpg";

    }, error => console.log('Could not load todos.'));
    //Call teh legislators api to get the vote inputs

  }

  callApis(fecId, bioguideId, thomasId, lis) {
    if (lis) {
      var voteId = lis;
    } else if (bioguideId) {
      var voteId = bioguideId;
    } else {
      var voteId = null;
    }
    Observable.forkJoin(
      this.http.get('/api/candidates/' + fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/' + fecId + '/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/' + fecId + '/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/' + fecId + '/committees').map((res: Response) => res.json()),
      this.http.get('/api/votes/' + voteId + '/yeas').map((res: Response) => res.json()),
      this.http.get('/api/votes/' + voteId + '/nays').map((res: Response) => res.json()),
      this.http.get('/api/votes/' + voteId + '/novotes').map((res: Response) => res.json()),
      this.http.get('/api/votes/tallies/yea').map((res: Response) => res.json()),
      this.http.get('/api/votes/tallies/nay').map((res: Response) => res.json()),
      this.http.get('/api/votes/tallies/novote').map((res: Response) => res.json()),
      this.http.get('/api/pac/' + fecId + '/candidate').map((res: Response) => res.json()),
      this.http.get('/api/pac/aggregate/' + fecId).map((res: Response) => res.json())

    ).subscribe(
      data => {
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.yeaVotes = data[4];
        this.nayVotes = data[5];
        this.absentVotes = data[6];
        this.allYeas = data[7];
        this.allNays = data[8];
        this.allAbsents = data[9];
        this.pacSpends = data[10];
        this.pacAgg = data[11];
        // this.AllYeas = this.tallyYeas(this.yeaVotes, this.allYeas);
        // this.AllNays = this.tallyNays(this.nayVotes, this.allNays);
        this.AllYeaVotes = this.tallyAllVotes(this.yeaVotes, this.allNays, this.allYeas, this.allAbsents)
        this.buildVoteChart(this.AllYeaVotes[0]);

      },
      err => console.error(err)
      );
  }

  tallyYeas(candYeas, allYeas){
    return candYeas.reduce((prev, curr) => {
      var dingo = allYeas.reduce(function(inPrev, inCurr){
        if (inCurr._id.vote_id === curr.vote_id){
          inPrev.push(inCurr);
          return inPrev;
        } else {
          return inPrev;
        }
      }, []);
      prev.push(dingo);
      return prev;
    },[])
  }

  tallyNays(candNays, allNays) {
    return candNays.reduce((prev, curr) => {
      var dingo = allNays.reduce(function(inPrev, inCurr) {
        if (inCurr._id.vote_id === curr.vote_id) {
          inPrev.push(inCurr);
          return inPrev;
        } else {
          return inPrev;
        }
      }, []);
      prev.push(dingo);
      return prev;
    }, [])
  }

  tallyAllVotes(candVotes, allNays, allYeas, allAbsents) {
    return candVotes.reduce((prev, curr) => {
      var nays = allNays.reduce(function(inPrev, inCurr) {
        if (inCurr._id.vote_id === curr.vote_id) {
          inPrev[inCurr._id.party] = inCurr.count;
          return inPrev;
        } else {
          return inPrev;
        }
      }, {
          R: 0,
          D: 0,
          I: 0
        });

      var yeas = allYeas.reduce(function(inPrev, inCurr) {
        if (inCurr._id.vote_id === curr.vote_id) {
          inPrev[inCurr._id.party] = inCurr.count;
          return inPrev;
        } else {
          return inPrev;
        }
      }, {
          R: 0,
          D: 0,
          I: 0
        });

      var absents = allAbsents.reduce(function(inPrev, inCurr) {
        if (inCurr._id.vote_id === curr.vote_id) {
          inPrev[inCurr._id.party] = inCurr.count;
          return inPrev;
        } else {
          return inPrev;
        }
      }, {
          R: 0,
          D: 0,
          I: 0
        });

      var pushable = {
        vote_id: curr.vote_id,
        question: curr.question,
        yeas: yeas,
        nays: nays,
        absents: absents
      };

      prev.push(pushable);
      return prev;
    }, [])
  }


  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

  buildVoteChart(votes) {
    var types = ["yeas", "nays", "absents"];
    var parties = ["R", "D", "I"];

    var width = 400,
        height = 400;

    var x = d3.scale.linear()
      .range([0,400]);

    var y = d3.scale.linear()
      .rangeRound([height, 0]);

    var z = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("right");

    var svg = d3.select(".votesChart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")

      var layers = d3.layout.stack()(types.map(function(c) {
        return parties.map(function(d, i) {
          return { x: i, y: votes[c][d] };
        });
      }));

      console.log("Layers! ", layers);

      x.domain(layers[0].map(function(d) { return d.x; }));
      y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]).nice();

      var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return z(i); });

      layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { console.log(40 * d.x); return 40 * d.x; })
        .attr("y", function(d) { return y(d.y + d.y0); })
        .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
        .attr("width", 40);

      svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxis);
    // });

    function type(d) {
      types.forEach(function(c) { d[c] = +d[c]; });
      return d;
    }
  }
}