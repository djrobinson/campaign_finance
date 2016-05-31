import {Component, Input, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'pie-chart',
  template: `
      <div id="containerChart2" class="twelve-columns">
        <div id="chart2">
        </div>
      </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }

    #containerChart2 {
      height: 100%;
      width: 100%;
    }

  `]
})
export class PieComponent implements OnInit, OnChanges {
  constructor(private http:Http) {}

  callAsc(associatedCommittees) {
      var buildPieChart = this.buildPieChart;
      var http = this.http;
      var indivToCommittees = [];
      var pieData = [
        {
          label: '>2700',
          amount: 0,
          count: 0
        },
        {
          label: '1500-2699',
          amount: 0,
          count: 0
        },
        {
          label: '500-1499',
          amount: 0,
          count: 0
        },
        {
          label: '200-499',
          amount: 0,
          count: 0
        },
        {
          label: '<200',
          amount: 0,
          count: 0
        }
      ];
      var j = 0;
      associatedCommittees.forEach(function(cmte, i) {
        http.get('api/individuals/committee/'+cmte.CMTE_ID).map(response => response.json()).subscribe(
          data=>{
          // indivToCommittees = indivToCommittees.concat(data);
          var chartStuff =  data.reduce(function(prev, curr) {
            var amt = parseFloat(curr.TRANSACTION_AMT);
            if (amt > 2700) {
              prev[0].amount += amt;
              prev[0].count += 1;
              return prev;
            } else if (amt > 1500) {
              prev[1].amount += amt;
              prev[1].count += 1;
              return prev;
            } else if (amt > 500) {
              prev[2].amount += amt;
              prev[2].count += 1;
              return prev;
            } else if (amt > 200) {
              prev[3].amount += amt;
              prev[3].count += 1;
              return prev;
            } else {
              prev[4].amount += amt;
              prev[4].count += 1;
              return prev;
            }

          }, pieData)
          if (i === associatedCommittees.length - 1) {
            buildPieChart(chartStuff);
          }
        })
      })
  }



  buildPieChart(pieData) {
    (function(d3) {
      'use strict';

      var width = document.getElementById('containerChart2').offsetWidth;
      var height = document.getElementById('containerChart2').offsetHeight;
      var radius = Math.min(width, height) / 2.25;
      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;

      var color = d3.scale.category20b();

      var svg = d3.select('#chart2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function(d) { return d.count; })
        .sort(null);

      var tooltip = d3.select('#chart2')
        .append('div')
        .attr('class', 'tooltip');

      tooltip.append('div')
        .attr('class', 'label');

      tooltip.append('div')
        .attr('class', 'count');

      tooltip.append('div')
        .attr('class', 'percent');

      start(pieData);
      function start(dataset){
        dataset.forEach(function(d) {
          d.count = +d.count;
        });

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) {
            return color(d.data.label);
          });

        path.on('mouseover', function(d) {
          var total = d3.sum(dataset.map(function(d) {
            return d.count;
          }));
          var percent = Math.round(1000 * d.data.count / total) / 10;
          tooltip.select('.label').html(d.data.label);
          tooltip.select('.count').html(d.data.count);
          tooltip.select('.percent').html(percent + '%');
          tooltip.style('display', 'block');
        });

        path.on('mouseout', function() {
          tooltip.style('display', 'none');
        });

        path.on('mousemove', function(d) {
          tooltip.style('top', (d3.event.pageY + 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px');
        });


        var legend = svg.selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
          });

        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', color)
          .style('stroke', color);

        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) { return d; });

      });

    })(window.d3);
  }

  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

}