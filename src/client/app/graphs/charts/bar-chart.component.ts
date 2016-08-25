import {Component, Input, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {SpinnerComponent} from '../../loading/spinner.component';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'bar-chart',
  template: `
    <div class="bar-chart-container">
      <p>Donations by Month</p>
      <div id="containerChart4">
      <spinner [isRunning]="isRequestingBar">
      </spinner>
      </div>
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

    .bar-chart-container p {
      text-align: center;
      font-family: 'Prata', serif;
      font-size: 1.5rem;
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
    var margin = {top: 20, right: 20, bottom: 60, left: 60},
        width = document.getElementById('containerChart4').offsetWidth - margin.left - margin.right,
        height = document.getElementById('containerChart4').offsetHeight - margin.top - margin.bottom;

    var x0 = d3.time.scale();
        // .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#305252", "#35978F"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom")
        .tickFormat(d3.time.format("%b-%Y"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#containerChart4").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = graphData;

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


      // x0.domain(barFinal.map(function(d) {
      //   // var tickDate = new Date(d.date);
      //   // return tickDate;
      //   return d.date;
      // }));
      x0.domain([minDate, maxDate]).range([0, width]);
      x1.domain(["individuals", "committees"]).rangeRoundBands([0, width / barFinal.length]);
      y.domain([0, d3.max(data, function(d) { return +d.sum})]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .attr("dy", "2em")
          .attr("dx", "-2em")
          .attr("transform", "rotate(-45)");

      svg.selectAll("path")
          .attr("fill", "transparent")
          .attr("stroke", "transparent");

      svg.selectAll(".domain")
          .attr("fill", "transparent")
          .attr("stroke", "transparent");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .attr("stroke", "#4d4d4d")
          .style("text-anchor", "end")
          .text("Amount");

      var donations = svg.selectAll(".donations")
          .data(barFinal)
        .enter().append("g")
          .attr("class", "donations")
          .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

      donations.selectAll("rect")
          .data(function(d) { return d.vals; })
        .enter().append("rect")
          .attr("width", x1.rangeBand() * 1.5)
          .attr("x", function(d) {
            return x1(d.type) * 1.5;
          })
          .attr("y", function(d) { return y(d.sum) })
          .attr("height", function(d) { return height - y(d.sum); })
          .style("fill", function(d) { return color(d.type); });

      var donorTypes = ["Individuals", "Committees"]
      var legend = svg.selectAll(".legend")
          .data(donorTypes.slice())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", 24)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d, i) {
            return color(i)});

      legend.append("text")
          .attr("x", 44)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .text(function(d) { return d; });
    });

}