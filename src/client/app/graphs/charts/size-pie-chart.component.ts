import {Component, Input, OnInit, OnChanges, EventEmitter} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SpinnerComponent} from '../../loading/spinner.component';

@Component({
  selector: 'size-pie',
  template: `


        <div class="header">
          <p>Individual Contributions by Size</p>
           <div class="asterisk">Breaks out itemized donations by size of donation. Does not include unitemized individual contributions.</div>
        </div>
        <spinner [isRunning]="isRequestingPie">
        </spinner>
        <div id="tooltip" class="hidden">
            <p><span id="label"></span>
            </p>
            <p><span id="value"></span></p>
        </div>
        <div id="chart2">
        </div>

  `,
  styles: [`

    .header * {
      margin: 0 !important;
      padding: 0 !important;
    }
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
      flex-direction: row;
    }

    #chart2 {
      margin: 0 !important;
      position: absolute;
      flex-grow: 1;
      display: flex;
      width: 100%;
      height: 100%;
    }

    .asterisk {
      postion: absolute;
      bottom: 0;
      right: 0
      font-size: 1.2rem;
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
  directives: [SpinnerComponent]
})
export class SizePieComponent implements OnInit, OnChanges {
  public isRequestingPie: boolean;
  @Input() cmte: string;


  constructor(private http:Http) {}

  ngOnInit(){
      this.isRequestingPie = true;
      this.http.get('/api/individuals/committee/'+this.cmte+'/pie')
        .subscribe(
            result => {
                      this.callAsc(JSON.parse(result._body));
                      this.stopRefreshing();
                    },
            error => console.log(error))
  }

  public callAsc(data) {

    var buildPieChart = this.buildPieChart;
    var http = this.http;
    var pieData = [];
      data.data = JSON.parse(data.data);
      Object.keys(data.data[0]).forEach((key)=>{
        if (key !== "count"){
          pieData.push({
            label: key,
            amount: +data.data[0][key]
          });
        }
      });
      buildPieChart(pieData);
      this.stopRefreshing();
  }

  private stopRefreshing() {
    this.isRequestingPie = false;
  }

  public buildPieChart(pieData) {
    (function(d3) {
      'use strict';
      d3.selectAll("#chart2 > *").remove();

      var width = document.getElementById('chart2').offsetWidth;
      var height = document.getElementById('chart2').offsetHeight;
      var radius = height / 3;
      var donutWidth = 30;
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

      var svg = d3.select('#chart2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (radius + 10) +
        ',' + (height / 3) + ')');

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
          // tooltip.select('.pie-label').html(d.data.label);
          // tooltip.select('.pie-amount').html(d.data.amount);
          // tooltip.select('.pie-percent').html(percent + '%');
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