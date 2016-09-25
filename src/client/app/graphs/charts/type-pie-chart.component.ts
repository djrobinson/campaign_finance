import {Component, Input, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'type-pie',
  template: `
        <div class="header">
          <p>Donations by Committee Type</p>
        </div>
        <div id="tooltip" class="hidden">
            <p><span id="label"></span>
            </p>
            <p><span id="value"></span></p>
        </div>
        <div id="chartType">
        </div>
  `,
  styles: [`

    .header p {
      size: 3rem;
      margin: 0 !important;
      font-family: 'Oswald';
      font-weight: 500;
      font-size: 1.5rem;
    }

    .chartContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    #chartType {
      margin: 0 !important;
      position: absolute;
      flex-grow: 1;
      display: flex;
      width: 100%;
      height: 100%;
    }

    #tooltip {
      position: fixed;
      top: 0;
      left: 0;
      width: 200px;
      height: auto;
      padding: 10px;
      background-color: white;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
      -mox-box-shadow: 4px 4px 4px 10px rgba(0, 0, 0, 0.4);
      box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4) pointer-events: none;
      z-index: 6;
    }
    #tooltip.hidden {
        opacity: 0;
    }
    #tooltip p {
        margin: 0;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 20px;
        color: black;
    }

  `],
  directives: []
})
export class TypePieComponent implements OnInit, OnChanges {
  public isRequesting: boolean;
  constructor(private http:Http) {}

  public callAsc(data) {
    var buildPieChart = this.buildPieChart;
    var http = this.http;
    var pieData = [];
    data.forEach((item)=>{
      switch(item.CMTE_TP){
        case 'C':
          item.CMTE_TP = 'Communication Cost';
          break;
        case 'D':
          item.CMTE_TP = 'Delegate Committee';
          break;
        case 'E':
          item.CMTE_TP = 'Electioneering Communication';
          break;
        case 'H':
          item.CMTE_TP = 'House';
          break;
        case 'I':
          item.CMTE_TP = 'Independent Expenditor';
          break;
        case 'N':
          item.CMTE_TP = 'PAC - Nonqualified';
          break;
        case 'O':
          item.CMTE_TP = 'Super PAC';
          break;
        case 'P':
          item.CMTE_TP = 'Presidential';
          break;
        case 'Q':
          item.CMTE_TP = 'PAC - Qualified';
          break;
        case 'S':
          item.CMTE_TP = 'Senate';
          break;
        case 'U':
          item.CMTE_TP = 'Single Cand Super PAC';
          break;
        case 'V':
          item.CMTE_TP = 'PAC w/ Non-Contribution Account - Nonqualified';
          break;
        case 'W':
          item.CMTE_TP = 'PAC w/ Non-Contribution Account - Qualified';
          break;
        case 'X':
          item.CMTE_TP = 'Party - Nonqualified';
          break;
        case 'Y':
          item.CMTE_TP = 'Party - Qualified';
          break;
        case 'Z':
          item.CMTE_TP = 'National Party Nonfederal Account';
          break;
        default:
          item.CMTE_TP = item.CMTE_DSGN;
      }

      pieData.push({
        label: item.CMTE_TP,
        amount: +item.sum
      });
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
      d3.selectAll("#chartType > *").remove();

      var width = document.getElementById('chartType').offsetWidth;
      var height = document.getElementById('chartType').offsetHeight;
      var radius = width / 3 ;
      var donutWidth = 50;
      var legendRectSize = 12;
      var legendSpacing = 2;

      var colors = [ '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1','#35978f',  '#7B9E87', '#01665e'];

      var countColors = [];
      var remColors = [];

      var colorIterator = 0;;
      function color(d){
        if (colorIterator < colors.length)
        {
          colorIterator++;
          countColors.push(d);
          remColors.push(colors[colorIterator]);
          return colors[colorIterator];
        } else {
          countColors.push(d);
          colorIterator = 0;
          remColors.push(colors[colorIterator]);
          return colors[colorIterator];
        }
      };

      var svg = d3.select('#chartType')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (radius + 10) +
        ',' + (height / 2.5) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var arcOver = d3.svg.arc()
        .innerRadius(radius - 40)
        .outerRadius(radius + 10);

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

        var formatCurrency = d3.format("$,.2f");

        path.on('mouseover', function(d) {
          tooltip.style('display', 'flex');
          pieTitle.style('display', 'none');
          var total = d3.sum(dataset.map(function(d) {
            return d.amount;
          }));
          var percent = Math.round(1000 * d.data.amount / total) / 10;
          console.log("event: ", d3.event.pageX);
          d3.select("#tooltip")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px")
              .style("opacity", 1)
              .select("#value")
              .text(d.data.label+" : "+formatCurrency(d.data.amount));

          d3.select(this).transition()
              .duration(400)
              .attr("d", arcOver);
        })
        .on("mouseout", function () {
              // Hide the tooltip
              d3.select("#tooltip")
                  .style("opacity", 0);;
              tooltip.style('display', 'none');
              pieTitle.style('display', 'flex');
              d3.select(this).transition()
                .duration(400)
                .attr("d", arc);
          });


        var legend = svg.selectAll('.legend')
          .data(countColors)
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * countColors.length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            var moveLeft = radius + 10;
            return 'translate(' + moveLeft + ',' + vert + ')';
          });


        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', function(d, i){
            console.log("Count Colors arr: ", countColors[i]);
            return remColors[i];
          })

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