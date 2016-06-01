import {Component, Input, OnInit, ElementRef} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'vote-chart',
  template: `
      <p><a [routerLink] = "['Bill', {bill_id: votes.bill_id, congress: votes.congress}]">Linky Link</a></p>
      <p>{{votes.congress}} , {{votes.bill_id}}</p>
      <p>{{votes.question}}</p>
      <div class="votesChart">
      </div>

  `,
  directives: [ROUTER_DIRECTIVES],
  styles: [],
  providers: [ElementRef]
})
export class VoteChartComponent implements OnInit {
  @Input() votes: Object;
  elementRef: ElementRef;
  // [routerLink] = "['Bill', {bill_id: bill.bill_id, congress: bill.congress}]"
  constructor(elementRef: ElementRef){
    this.elementRef = elementRef;
  }
  ngOnInit(){
    this.buildVoteChart(this.votes);
  }

  buildVoteChart(votes) {
    var types = ["yeas", "nays", "absents"];
    var parties = ["R", "D", "I"];

    var margins = {
      left: 35,
    }

    var width = 200 - margins.left,
      height = 100;

    var x = d3.scale.linear()
      .range([0, width]);

    var y = d3.scale.ordinal()
      .domain(types)
      .rangeRoundBands([0, height], .1)

      ;

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var svg = d3.select(this.elementRef.nativeElement).select(".votesChart").append("svg")
      .attr("width", width + margins.left)
      .attr("height", height)
      .append("g")
      .attr('transform', 'translate(' + margins.left +')')

    var layers = d3.layout.stack()(parties.map(function(c) {
      return types.map(function(d, i) {
        return { x: i, y: votes[d][c], party: c, type: d };
      });
    }));

    layers = layers.map(function(group) {
      return group.map(function(d) {
        // Invert the x and y values, and y0 becomes x0
        return {
          x: d.y,
          y: d.x,
          x0: d.y0,
          party: d.party,
          type: d.type
        };
      });
    })

    x.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.x0 + d.x; })]).nice();

    var layer = svg.selectAll(".layer")
      .data(layers)
      .enter().append("g")
      .attr("class", "layer")


    layer.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d) { return x(d.x0); })
      .attr("y", function(d) { return d.y * (height / 3 + 1); })
      .attr("height", 20)
      .attr("width", function(d) { return x(d.x + d.x0) - x(d.x0); })
      .attr("party", function(d) { return d.party })
      .style("fill", function(d) {
        if (d.party === 'R') {
          return 'red';
        } else if (d.party === 'D') {
          return 'blue';
        } else if (d.party === 'I') {
          return 'gray';
        }
      });



    svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0,0)")
      .call(yAxis);
    // });
      // .attr("transform", "translate(" + width + ",0)")

    function type(d) {
      types.forEach(function(c) { d[c] = +d[c]; });
      return d;
    }
  }
}

