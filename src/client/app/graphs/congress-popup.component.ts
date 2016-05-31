import {Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';
import {TreemapComponent} from './charts/treemap.component';
import {PieComponent} from './charts/pie-chart.component';
import {VoteChartComponent} from './charts/vote-chart.component';

@Component({
  selector: 'congress-popup',
  templateUrl: 'app/graphs/templates/congress-popup.html',
  directives: [TreemapComponent, PieComponent, VoteChartComponent],
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
      padding: 12px;
      height: 300px;
      overflow: scroll;
    }
    .votes {
      width: 100%;
    }
    .chart {
      height: 400px;
    }
    .treemap {
      height: 300px;
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

      },
      err => console.error(err)
      );
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
}