import {Component, Input, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';

@Component({
  selector: 'pie-chart',
  template: `
      <div id="containerChart2">
        <div class="pie-title">
          <h5>Donations by Size</h5>
        </div>
        <div id="chart2">
          <spinner [isRunning]="isRequesting">
          </spinner>
        </div>
        <div class="tooltip">
          <table class="cand-table">
            <tr>
              <th>
                Size
              </th>
              <th>
                Count
              </th>
              <th>
                Percentage
              </th>
            </tr>
            <tr>
              <td class="label"></td>
              <td class="count"></td>
              <td class="percent"></td>
            </tr>
          </table>
        </div>
      </div>
  `,
  styles: [`

    #containerChart2 {
      display: flex;
      flex-direction: column;
      position: absolute;
      height: 100%;
      width: 100%;
    }

    #chart2 {
      flex-grow: 1;
      display: flex;
      width: 100%;
      margin-top: 10%;
    }

    .pie-title {
      display: block;
      position: absolute;
      height: 10%;
      width: 100%;
      text-align: center;
    }

    .tooltip {
      display: flex;
      align-self: flex-end;
      width: 100%;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    th {
      font-size: 1.5rem;
      text-align: center;
    }
    td {
      text-align: center;
      font-size: 1.5rem;
    }
    spinner {
      position: absolute;
      left: 30%;
    }
  `],
  directives: [SpinnerComponent]
})
export class PieComponent implements OnInit, OnChanges {
  public isRequesting: boolean;
  constructor(private http:Http) {}

  public callAsc(associatedCommittee) {
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
        this.isRequesting = true;
        http.get('api/individuals/committee/'+associatedCommittee.CMTE_ID+'/chart').map(response => response.json()).subscribe(
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
          buildPieChart(chartStuff)
        },
          error => console.error('Error: ' + error),
          () => {
            this.stopRefreshing();
    })
  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  buildPieChart(pieData) {
    (function(d3) {
      'use strict';

      var width = document.getElementById('chart2').offsetWidth;
      var height = document.getElementById('chart2').offsetHeight;
      var radius = Math.min(width, height) / 2.25;
      var donutWidth = 15;
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

      var tooltip = d3.select('.tooltip')



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
          tooltip.style('display', 'flex');
          var total = d3.sum(dataset.map(function(d) {
            return d.count;
          }));
          var percent = Math.round(1000 * d.data.count / total) / 10;
          tooltip.select('.label').html(d.data.label);
          tooltip.select('.count').html(d.data.count);
          tooltip.select('.percent').html(percent + '%');
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