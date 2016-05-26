import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {TitleService} from '../api_services/title.service';

@Component({
  selector: 'candidate-popup',
  template: `
    <div class="cand-style">
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

            <div>
              <h3>Usage of Funds</h3>
            </div>
            <div class="table-div">
              <ul>
                <li  *ngFor="#pacspend of pacSpends">{{pacspend.pay}} {{pacspend.exp_amo}}</li>
              </ul>
          </div>
        </div>
        <div class="row">
           <div class="three columns">
            <div class="table-div">
              <div id="chart">

              </div>
            </div>
           </div>
           <div class="three columns">
            <div class="table-div">
              <ul>
                <li *ngFor="#item of associatedCommittees">{{item.CMTE_ID}} {{item.CMTE_TP}}</li>
              </ul>
            </div>
           </div><div class="three columns">
            <div class="table-div">
              <ul>
                <li *ngFor="#item of disbursements">{{item}}</li>
              </ul>
            </div>
           </div><div class="three columns">
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
  `]
})
export class CandidatePopupComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.
  @Input() candidate: string;
  @Output() exitEmit = new EventEmitter();
  private candidate: Observable<Object>;
  private disbursements: Object;
  private candidateInfo: Object;
  private imageVar: Object;


  constructor(private _TitleService: TitleService,
              private http: Http) {

    this.parseFloat = function(num){
      return parseFloat(num);
    }
  }

  ngOnInit(){
    console.log(this.candidate);
    this.buildTreeMap();
    this.http.get('/api/legislators/' + this.candidate).map(response => response.json()).subscribe(data => {
      console.log("cand info: ",data);
      this.candidateInfo = data[0];
      console.log("info: ", this.candidateInfo);
      if (this.candidateInfo){
        this.callApis(this.candidate, this.candidateInfo.id.bioguide, this.candidateInfo.id.thomas, this.candidateInfo.id.lis);
        this.imageVar = {};
        this.imageVar.image = 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/'+ this.candidateInfo.id.bioguide + '.jpg';
      } else {
        this.callApis(this.candidate, null, null)
      }
    }, error => console.log('Could not load todos.'));
    //Call teh legislators api to get the vote inputs

  }

  callApis(fecId, bioguideId, thomasId, lis){
    console.log(lis);
    if (lis){
      var voteId = lis;
    } else if (bioguideId) {
      var voteId = bioguideId;
    } else {
      var voteId = null;
    }
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/committees').map((res: Response) => res.json()),
      this.http.get('/api/votes/'+voteId+'/yeas').map((res: Response) => res.json()),
      this.http.get('/api/votes/'+voteId+'/nays').map((res: Response) => res.json()),
      this.http.get('/api/pac/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/pac/aggregate/'+fecId).map((res: Response) => res.json())

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.yeaVotes = data[4];
        this.nayVotes = data[5];
        this.pacSpends = data[6];
        this.pacAgg = data[7];

      },
      err => console.error(err)
    );
  }

  callPresApis(fecId){
    console.log(lis);
    if (lis){
      var voteId = lis;
    } else if (bioguideId) {
      var voteId = bioguideId;
    } else {
      var voteId = null;
    }
    Observable.forkJoin(
      this.http.get('/api/candidates/'+fecId).map((res: Response) => res.json()),
      this.http.get('/api/disbursements/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/contributions/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/candidates/'+fecId+'/committees').map((res: Response) => res.json()),
      this.http.get('/api/pac/'+fecId+'/candidate').map((res: Response) => res.json()),
      this.http.get('/api/pac/aggregate/'+fecId).map((res: Response) => res.json()),

    ).subscribe(
      data => {
        console.log(data);
        this.candidate = data[0][0];
        this.disbursements = data[1];
        this.contributions = data[2];
        this.associatedCommittees = data[3];
        this.pacSpends = data[4];
        this.pacAgg = data[5];
      },
      err => console.error(err)
    );
  }

  buildTreeMap(){
    var margin = { top: 30, right: 0, bottom: 20, left: 0 },
      width = 960,
      height = 500 - margin.top - margin.bottom,
      formatNumber = d3.format(",%"),
      colorDomain = [-.6, 0, .6],
      colorRange = ["#373a93", 'white', "#936638"],
      transitioning;

    // sets x and y scale to determine size of visible boxes
    var x = d3.scale.linear()
      .domain([0, width])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, height])
      .range([0, height]);

    // adding a color scale
    var color = d3.scale.linear()
      .domain(colorDomain)
      .range(colorRange);

    // introduce color scale here

    var treemap = d3.layout.treemap()
      .children(function(d, depth) { return depth ? null : d._children; })
      .sort(function(a, b) { return a.value - b.value; })
      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
      .round(false);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top)
      .style("margin-left", -margin.left + "px")
      .style("margin.right", -margin.right + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("shape-rendering", "crispEdges");

    var grandparent = svg.append("g")
      .attr("class", "grandparent");

    grandparent.append("rect")
      .attr("y", -margin.top)
      .attr("width", width)
      .attr("height", margin.top);

    grandparent.append("text")
      .attr("x", 6)
      .attr("y", 6 - margin.top)
      .attr("dy", ".75em");

    var legend = d3.select("#legend").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", 30)
      .attr('class', 'legend')
      .selectAll("g")
      .data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
      .enter()
      .append('g')

    // functions

    function initialize(root) {
      root.x = root.y = 0;
      root.dx = width;
      root.dy = height;
      root.depth = 0;
    }

    // Aggregate the values for internal nodes. This is normally done by the
    // treemap layout, but not here because of our custom implementation.
    // We also take a snapshot of the original children (_children) to avoid
    // the children being overwritten when when layout is computed.
    function accumulate(d) {
      return (d._children = d.children)
        // recursion step, note that p and v are defined by reduce
        ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : d.value;
    }



    // Compute the treemap layout recursively such that each group of siblings
    // uses the same size (1×1) rather than the dimensions of the parent cell.
    // This optimizes the layout for the current zoom state. Note that a wrapper
    // object is created for the parent node for each group of siblings so that
    // the parent’s dimensions are not discarded as we recurse. Since each group
    // of sibling was laid out in 1×1, we must rescale to fit using absolute
    // coordinates. This lets us use a viewport to zoom.
    function layout(d) {
      if (d._children) {
        // treemap nodes comes from the treemap set of functions as part of d3
        treemap.nodes({ _children: d._children });
        d._children.forEach(function(c) {
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
          // recursion
          layout(c);
        });
      }
    }

    function colorIncrements(d) {
      return (colorDomain[colorDomain.length - 1] - colorDomain[0]) / 18 * d + colorDomain[0];
    }


    legend.append("rect")
      .attr("x", function(d) { return margin.left + d * 40 })
      .attr("y", 0)
      .attr("fill", function(d) { return color(colorIncrements(d)) })
      .attr('width', '40px')
      .attr('height', '40px')


    legend.append("text")
      .text(function(d) { return formatNumber(colorIncrements(d)) })
      .attr('y', 20)
      .attr('x', function(d) { return margin.left + d * 40 + 20 });

    // determines if white or black will be better contrasting color
    function getContrast50(hexcolor) {
      return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff / 3) ? 'black' : 'white';
    }

    d3.json("app/graphs/test.json", function(root) {
      console.log(root)
      initialize(root);
      accumulate(root);
      layout(root);
      display(root);

      function display(d) {
        grandparent
          .datum(d.parent)
          .on("click", transition)
          .select("text")
          .text(name(d))

        // color header based on grandparent's rate
        grandparent
          .datum(d.parent)
          .select("rect")
          .attr("fill", function() { console.log(color(d.rate)); return color(d['rate']) })

        var g1 = svg.insert("g", ".grandparent")
          .datum(d)
          .attr("class", "depth");

        var g = g1.selectAll("g")
          .data(d._children)
          .enter().append("g");

        g.filter(function(d) { return d._children; })
          .classed("children", true)
          .on("click", transition);

        g.selectAll(".child")
          .data(function(d) { return d._children || [d]; })
          .enter().append("rect")
          .attr("class", "child")
          .call(rect);

        g.append("rect")
          .attr("class", "parent")
          .call(rect)
          .append("title")
          .text(function(d) { console.log(typeof (d.value), d.value); return d.name + ', Cases of TB: ' + d.value + ', percent change: ' + formatNumber(d.rate); });

        g.append("text")
          .attr("dy", ".75em")
          .text(function(d) { return d.name; })
          .call(text);

        function transition(d) {
          if (transitioning || !d) return;
          transitioning = true;

          var g2 = display(d),
            t1 = g1.transition().duration(750),
            t2 = g2.transition().duration(750);

          // Update the domain only after entering new elements.
          x.domain([d.x, d.x + d.dx]);
          y.domain([d.y, d.y + d.dy]);

          // Enable anti-aliasing during the transition.
          svg.style("shape-rendering", null);

          // Draw child nodes on top of parent nodes.
          svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

          // Fade-in entering text.
          g2.selectAll("text").style("fill-opacity", 0);

          // Transition to the new view.
          t1.selectAll("text").call(text).style("fill-opacity", 0);
          t2.selectAll("text").call(text).style("fill-opacity", 1);
          t1.selectAll("rect").call(rect);
          t2.selectAll("rect").call(rect);

          // Remove the old node when the transition is finished.
          t1.remove().each("end", function() {
            svg.style("shape-rendering", "crispEdges");
            transitioning = false;
          });
        }

        return g;
      }

      function text(text) {
        text.attr("x", function(d) { return x(d.x) + 6; })
          .attr("y", function(d) { return y(d.y) + 6; })
          .attr("fill", function(d) { return getContrast50(color(parseFloat(d.rate))) });
      }

      function rect(rect) {
        rect.attr("x", function(d) { return x(d.x); })
          .attr("y", function(d) { return y(d.y); })
          .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
          .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
          .attr("fill", function(d) { return color(parseFloat(d.rate)); });
      }

      function name(d) {
        return d.parent
          ? name(d.parent) + "." + d.name
          : d.name;
      }




    });

  }

  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}