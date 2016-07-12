import {Component, Input, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'size-pie',
  template: `
        <p>Donations by Size</p>
          <div id="chart2">
          </div>
  `,
  styles: [`

    p {
      size: 3rem;
      margin: 0 !important;
      font-family: 'Oswald';
      font-weight: 300;
    }

    .chartContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    #chart2 {
      margin: 0 !important;
      position: absolute;
      flex-grow: 1;
      display: flex;
      width: 100%;
      height: 100%;
    }

  `],
  directives: []
})
export class SizePieComponent implements OnInit, OnChanges {
  public isRequesting: boolean;
  constructor(private http:Http) {}

  public callAsc(data) {

    var buildPieChart = this.buildPieChart;
    var http = this.http;
    var pieData = [];
    this.isRequesting = true;
      Object.keys(data[0]).forEach((key)=>{
        if (key !== "count"){
          pieData.push({
            label: key,
            amount: +data[0][key]
          });
        }
      });
      buildPieChart(pieData);
      this.stopRefreshing();
  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  public buildPieChart(pieData) {
    (function(d3) {
      'use strict';

      var width = document.getElementById('chart2').offsetWidth;
      var height = document.getElementById('chart2').offsetHeight;
      var radius = height /  3;
      var donutWidth = 15;
      var legendRectSize = 12;
      var legendSpacing = 2;

      var color = d3.scale.category20b();

      var svg = d3.select('#chart2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (radius + 10) +
        ',' + (height / 2.5) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function(d) { return d.amount; })
        .sort(null);

      var tooltip = d3.select('.pie-tooltip');
      var pieTitle = d3.select('#pies-title');

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
          pieTitle.style('display', 'none');
          var total = d3.sum(dataset.map(function(d) {
            return d.amount;
          }));
          var percent = Math.round(1000 * d.data.amount / total) / 10;
          tooltip.select('.pie-label').html(d.data.label);
          tooltip.select('.pie-amount').html(d.data.amount);
          tooltip.select('.pie-percent').html(percent + '%');
        });

        path.on('mouseout', function() {
          tooltip.style('display', 'none');
          pieTitle.style('display', 'flex');
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
            var moveLeft = radius + 10;
            return 'translate(' + moveLeft + ',' + vert + ')';
          });

        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', color)
          .style('stroke', color);

        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .style('fill', '#ECF9FD')
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