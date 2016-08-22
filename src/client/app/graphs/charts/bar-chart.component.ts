import {Component, Input, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {SpinnerComponent} from '../../loading/spinner.component';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'bar-chart',
  template: `

      <div id="containerChart4">
      <spinner [isRunning]="isRequestingBar">
      </spinner>
      </div>
  `,
  styles: [`

    #containerChart4 {
      display: flex;
      position: absolute;
      height: 100%;
      width: 90%;
      bottom: 0;
    }
  `],
  directives: [SpinnerComponent]
})
export class BarComponent {
  @Input() graphData: any;
  @Input() cmte: string;
  private isRequestingBar: boolean;

  constructor(private http: Http){};

  ngOnInit(){
    this.isRequestingBar = true;

    Observable.forkJoin(
      this.http.get('/api/individuals/committee/'+this.cmte+'/date')
        .map((res: Response) => res.json()),
      this.http.get('/api/transfers/'+this.cmte+'/date')
        .map((res: Response) => res.json())
        )
        .subscribe(
            result => {
                      console.log("This one matters! ", result);
                      var indivData = result[0];
                      var cmteData = result[1];
                      var graphData = indivData.concat(cmteData);
                      this.stopRefreshing();
                      this.buildChart(graphData);

                    },
            error => console.log(error))
  }

  private stopRefreshing() {
    this.isRequestingBar = false;
  }


  public buildChart(graphData){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = document.getElementById('containerChart4').offsetWidth - margin.left - margin.right,
        height = document.getElementById('containerChart4').offsetHeight - margin.top - margin.bottom;

    var x0 = d3.time.scale();
        // .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#containerChart4").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = graphData;

      console.log("Data!", data[0]);
      data.forEach(function(d, i){
        data[i].count = +d.count;
      });

      var valTypes = data.map((item)=>item.date_trunc);
      var minDate = new Date();
      var maxDate = new Date(0);
      var barFinal = valTypes.map(function(date) {
        var convertDate = new Date(date);
        if (convertDate < minDate){
          minDate = convertDate;
        }
        if (convertDate > maxDate){
          maxDate = convertDate;
        }
        return {
          date: convertDate,
          vals: data.filter(function(d) {
            if (date === d.date_trunc){
              return d;
            }
          })
        }
      });

      console.log("minmax ", minDate, maxDate);

      // x0.domain(barFinal.map(function(d) {
      //   // var tickDate = new Date(d.date);
      //   // return tickDate;
      //   return d.date;
      // }));
      x0.domain([minDate, maxDate]).range([0, width]);
      x1.domain(["individuals", "committees"]).rangeRoundBands([0, width / barFinal.length]);
      y.domain([0, d3.max(data, function(d) { return +d.count})]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .attr("stroke", "#4d4d4d")
          .call(xAxis)
        .selectAll("text")
          .attr("transform", "rotate(90)");


      svg.append("g")
          .attr("class", "y axis")
          .attr("stroke", "#4d4d4d")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .attr("stroke", "#4d4d4d")
          .style("text-anchor", "end")
          .text("Count");

      var donations = svg.selectAll(".donations")
          .data(barFinal)
        .enter().append("g")
          .attr("class", "donations")
          .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

      donations.selectAll("rect")
          .data(function(d) { return d.vals; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.type); })
          .attr("y", function(d) { return y(d.count) })
          .attr("height", function(d) { return height - y(d.count); })
          .style("fill", function(d) { return color(d.type); });

      // var legend = svg.selectAll(".legend")
      //     .data(ageNames.slice().reverse())
      //   .enter().append("g")
      //     .attr("class", "legend")
      //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // legend.append("rect")
      //     .attr("x", width - 18)
      //     .attr("width", 18)
      //     .attr("height", 18)
      //     .style("fill", color);

      // legend.append("text")
      //     .attr("x", width - 24)
      //     .attr("y", 9)
      //     .attr("dy", ".35em")
      //     .style("text-anchor", "end")
      //     .text(function(d) { return d; });
    });

}