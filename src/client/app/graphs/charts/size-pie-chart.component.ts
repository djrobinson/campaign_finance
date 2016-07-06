import {Component, Input, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';

@Component({
  selector: 'size-pie',
  template: `
      <div id="containerChart2">
        <p>Itemized Individual Donations by Size</p>
        <div id="chart2">
          <spinner [isRunning]="isRequesting">
          </spinner>
        </div>
        <div class="size-tooltip">
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
              <td class="size-label"></td>
              <td class="size-amount"></td>
              <td class="size-percent"></td>
            </tr>
          </table>
        </div>
      </div>
  `,
  styles: [`

    #containerChart2 {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    #chart2 {
      flex-grow: 1;
      display: flex;
      width: 100%;
    }

    .pie-title {
      display: block;
      height: 10%;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
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
      font-size: 1rem;
      text-align: center;
    }
    td {
      text-align: center;
      font-size: 1rem;
    }
    spinner {
      left: 30%;
    }
    .cand-table {
      width: 100%;
    }
  `],
  directives: [SpinnerComponent]
})
export class SizePieComponent implements OnInit, OnChanges {
  public isRequesting: boolean;
  constructor(private http:Http) {}

  public callAsc(associatedCommittee) {
      var buildPieChart = this.buildPieChart;
      var http = this.http;
      var indivToCommittees = [];
      var pieData = [];
      var j = 0;
        this.isRequesting = true;
        http.get('/api/individuals/committee/'+associatedCommittee.CMTE_ID+'/pie').map(response => response.json()).subscribe(
          data=>{
            console.log(data);
          //
          Object.keys(data[0]).forEach((key)=>{
            if (key !== "count"){
              pieData.push({
                label: key,
                amount: +data[0][key]
              });
            }
          })
          buildPieChart(pieData);
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
      var height = width;
      var radius = width /  2.25;
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
        .value(function(d) { return d.amount; })
        .sort(null);

      var tooltip = d3.select('.size-tooltip')



      start(pieData);
      function start(dataset){
        dataset.forEach(function(d) {
          d.amount = +d.amount;
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
            return d.amount;
          }));
          var percent = Math.round(1000 * d.data.amount / total) / 10;
          tooltip.select('.size-label').html(d.data.label);
          tooltip.select('.size-amount').html(d.data.amount);
          tooltip.select('.size-percent').html(percent + '%');
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