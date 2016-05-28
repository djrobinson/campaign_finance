import {Component, Input, Output, OnInit} from 'angular2/core';

@Component({
  selector: 'vote-chart',
  template: `
      <div class="votesChart">
        {{votes.vote_id}}
      </div>
  `,
  directives: [],
  styles: [`

  `]
})
export class VoteChartComponent implements OnInit {
  @Input() votes: Object;

  ngOnInit(){
    this.buildVoteChart(this.votes);
  }

  buildVoteChart(votes) {
    var types = ["yeas", "nays", "absents"];
    var parties = ["R", "D", "I"];

    var width = 200,
      height = 100;

    var x = d3.scale.linear()
      .range([0, width]);

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

    var layers = d3.layout.stack()(parties.map(function(c) {
      return types.map(function(d, i) {
        return { x: i, y: votes[d][c], party: c };
      });
    }));

    layers = layers.map(function(group) {
      return group.map(function(d) {
        // Invert the x and y values, and y0 becomes x0
        return {
          x: d.y,
          y: d.x,
          x0: d.y0,
          party: d.party
        };
      });
    })

    y.domain(layers[0].map(function(d) { return d.y; }));
    x.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.x0 + d.x; })]).nice();

    var layer = svg.selectAll(".layer")
      .data(layers)
      .enter().append("g")
      .attr("class", "layer")


    layer.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d) { return x(d.x0); })
      .attr("y", function(d) { return d.y * 20; })
      .attr("height", 20)
      .attr("width", function(d) { return x(d.x + d.x0) - x(d.x0); })
      .attr("party", function(d) { return d.party })
      .style("fill", function(d) {
        console.log(d);
        if (d.party === 'R') {
          return 'red';
        } else if (d.party === 'D') {
          return 'blue';
        } else if (d.party === 'I') {
          return 'gray';
        }
      });

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

