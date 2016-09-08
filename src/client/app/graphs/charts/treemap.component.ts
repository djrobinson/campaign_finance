import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'treemap',
  template: `
      <div id="containerChart">
        <div id="tooltip">
          <div class="tip-top">
            <div class="tree-tip" id="tip-name"></div>
            <div class="tree-tip" id="tip-support"></div>
            <div class="tree-tip" id="tip-amount"></div>
            <div class="tree-tip" id="tip-purpose"></div>
            <div *ngIf="level === 'parent'">
              <img src="images/fec.png" class="fec" (click)="openFec(lin_ima)" />
            </div>
            <div *ngIf="level !=='main'">
              <div class="button" id="backup">
                Go Back
              </div>
          </div>
        </div>
          <div  class="instructions">
            <div *ngIf="level === 'main'" class="instruction-block">
              <h5>Expenditure by Recipient</h5>
              <p>All blocks to the right represent the amount of money given to a specific recipient. Click on the block to analyze all transactions to the recipeint.</p>
            </div>
            <div *ngIf="level === 'grandparent'" class="instruction-block">
              <h5>All Transactions to Recipient</h5>
              <p>All blocks to the right represent each transaction made to the selected recipient. Click the block to see further detail and link back to the FEC documentation</p>
            </div>
            <div *ngIf="level === 'parent'" class="instruction-block">
              <h5>Individual Transaction</h5>
              <p>Click on the FEC Link to see the original filing.</p>
            </div>
          </div>
        </div>
        <div id="chart"></div>
      </div>
  `,
  styles: [`

    #containerChart {
      position: absolute;
      height: 100%;
      width: 100%;
      background: #EFF1F3;
      font-family: 'Oswald';
      font-weight: 300;
    }

    .instructions {
      background: white;
      height: 100%;
      width: 100%;
      text-align: center;

    }

    .instructions p {
      font-size: 1.5rem;
    }

    .instruction-block {
      padding: 1rem;
      position: absolute;
      color: black;
      height: 50%;
      width: 100%;
      border-bottom: solid 2px #BDBBB6;
      box-sizing: border-box;
      background:  #f2f2f2;;
      bottom: 0;
      overflow: scroll;
      border-top: solid 1px black;
    }

    .button-container {
      position: absolute;
      top: 20%;
      display: block;
      height: 15%;
      width: 100%;
      background: #EFF1F3;
    }

    .tip-top {
      display: flex;
      padding: 3%;
      top: 0;
      position: absolute;
      height: 50%;
      width: 100%;
      background:  #f2f2f2;
      font-family: 'Prata', serif;
      font-size: 1.5rem;
      display: flex;
      align-items: space-between;
      justify-content: center;
      flex-direction: column;
      overflow: scroll;
    }

    .tip-top p {
      font-size: 1.5rem;
      disply: flex;
      align-self: left;
    }

    rect {
      stroke: black;
      stroke-width: 1px;
    }

    #tip-name {
      width: 100%;
    }


    #tip-purpose {
      width: 100%;
    }
    #tooltip {
      position: relative;
      text-align: center;
      width: 30%;
      height: 100%;
      bottom: 0;
      color: #5b4f49;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    #chart {
      position: absolute;
      width: 70%;
      height: 100%;
      right: 0;
      bottom: 0;
    }
    .child-tspan {
      font-size: 3rem;
    }

    .button {
      font-family: 'Prata', serif;
      background-color: #73877B; /* Green */
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      cursor: pointer;
      background-color: white;
      color: black;
      border: 2px solid #9DBF9E;
      border-radius: 25px;
      box-sizing: border-box;;
      width: 80%;
    }

    .button:hover {
        background-color: #9DBF9E;
        color: white;
    }

    .fec {
      height: 4rem;
    }
  `]
})
export class TreemapComponent implements OnInit, OnChanges {
  @Input() route: string;
  private level: string = "main";
  private lin_ima: string;

  constructor (){
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit(){
    var ctrl = this;
    this.buildTreeMap(this.route, ctrl);
  }

  rebuildMap(route){
    var ctrl = this;
    d3.selectAll("svg").remove();
    this.buildTreeMap(route, ctrl);
  }


  buildTreeMap(route, ctrl) {

    Number.prototype.formatMoney = function(c, d, t) {
      var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    function randomColor() {

      var colorArray = ['#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494'];
            //#ffffd9
      var random = Math.floor(Math.random() * colorArray.length);
      return colorArray[random];

    };

    var width = document.getElementById('chart').offsetWidth;
    var height = document.getElementById('chart').offsetHeight;
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };

    formatNumber = d3.format(",%"),
      colorDomain = [-.6, 0, .6],
      colorRange = ["#373a93", 'white', "#936638"],
      transitioning = false;

    // sets x and y scale to determine size of visible boxes
    var x = d3.scale.linear()
      .domain([0, width])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, height])
      .range([0, height]);

    // adding a color scale
    var color = d3.scale.linear()
      .domain(colorDomain)
      .range(colorRange);

    // introduce color scale here

    var treemap = d3.layout.treemap()
      .children(function(d, depth) { return depth ? null : d._children; })
      .sort(function(a, b) { return a.value - b.value; })
      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
      .round(false);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top)
      .style("margin-left", -margin.left + "px")
      .style("margin.right", -margin.right + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("shape-rendering", "crispEdges");

    var grandparent = svg.append("g")
      .attr("class", "grandparent");

    var legend = d3.select("#legend").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", 30)
      .attr('class', 'legend')
      .selectAll("g")
      .data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
      .enter()
      .append('g')

    // functions

    function initialize(root) {
      root.x = root.y = 0;
      root.dx = width;
      root.dy = height;
      root.depth = 0;
    }

    function accumulate(d) {
      return (d._children = d.children)
        ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : d.value;
    }

    function layout(d) {
      if (d._children) {
        treemap.nodes({ _children: d._children });
        d._children.forEach(function(c) {
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
          // recursion
          layout(c);
        });
      }
    }

    function colorIncrements(d) {
      return (colorDomain[colorDomain.length - 1] - colorDomain[0]) / 18 * d + colorDomain[0];
    }

    legend.append("text")
      .text(function(d) { return formatNumber(colorIncrements(d)) })
      .attr('y', 20)
      .attr('x', function(d) { return margin.left + d * 40 + 20 });

    function getContrast50(hexcolor) {
      return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff / 3) ? 'black' : 'white';
    }

    //starts w/ passed in data
    ///api/pac/aggregate/P00003392
    d3.json(route, function(root) {
      initialize(root);
      accumulate(root);
      layout(root);
      display(root);

      function display(d) {
        var backup = d3.select('#backup');
        backup
          .datum(d.parent)
          .on("click", transition)
          .select("text")
          .text(name(d))

        grandparent
          .datum(d.parent)

        var g1 = svg.insert("g", ".grandparent")
          .datum(d)
          .attr("class", "depth");

        var g = g1.selectAll("g")
          .data(d._children)
          .enter().append("g");

        g.filter(function(d) { return d._children; })
          .classed("children", true)

        g.selectAll(".child")
          .data(function(d) { return d._children || [d]; })
          .enter().append("rect")
          .attr("class", "child")
          .call(rect);

        g.append("rect")
          .attr("class", "parent")
          .call(rect)

        g.append("text")
          .attr("x", 0)
          .attr("dx", "0.35em")
          .attr("dy", "0.75em")
          .call(text)
          .each(addText);

        function addText(d) {
          var size = 16;
          var words = d.name.split(' ');
          var parentwidth = d3.select(this.parentNode.parentNode)[0][0].__data__.dx;
          var ratio = width / parentwidth;
          var cutwidth = d.dx * ratio;
          var length = 0;
          if (d.category === "parent" || d.category === "grandparent") {
            d3.select(this).append("tspan").style("font-size", size + "px").text(words.join(' '));
            while (this.getBBox().width >= cutwidth) {
              var word = words.join(' ');
              var el = d3.select(this).text('');
              var tspan = el.append("tspan").text(word);
              words.pop();
            }
          } else if (d.category === "child"){
            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.name)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "4rem")
              .style("font-size", "4rem")

            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.to)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "4rem")
              .style("font-size", "3rem")

            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.purpose)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "4rem")
              .style("font-size", "3rem")


            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.amount)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "4rem")
              .style("font-size", "3rem")
            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.date)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "4rem")
              .style("font-size", "3rem")
          }
        }

        g.attr("class", "cell")
          .on("click", transition)
          .on('mouseover', function(d) {
            console.log(d);
            // this variable will be used in a loop to store the current node being inspected
            var currentNode = d;
            // this array will hold the names of each subsequent parent node
            var nameList = [currentNode.name];
            // as long as the current node has a parent...
            while (typeof currentNode.parent === 'object') {
              // go up a level in the hierarchy
              currentNode = currentNode.parent;
              // add the name to the beginning of the list
              nameList.unshift(currentNode.name);
            }
            // now nameList should look like ['flare','animate','interpolate']
            //  join the array with slashes (as you have in your example)
            // now nameList should look like 'flare/animate/interpolate'
            //  use this to set the tooltip text
            d3.select('#tip-name').text(d.name);
            d3.select('#tip-amount').text("$" + d.value.formatMoney(2));
            d3.select('#tip-support').text(d.support);
            d3.select('#tip-purpose').text(d.purpose);
          })

        function transition(d) {
          console.log("Here's D! ", d);
          if (d._children === undefined) {
            console.log("No Transition?");
            return;
          };
          ctrl.level = d.category;
          console.log(d.parent);
          if (typeof d.parent === 'undefined'){
            ctrl.level = 'main';
          }

          if (transitioning || !d) return;
          transitioning = true;

          var g2 = display(d),
            t1 = g1.transition().duration(750),
            t2 = g2.transition().duration(750);

          x.domain([d.x, d.x + d.dx]);
          y.domain([d.y, d.y + d.dy]);

          svg.style("shape-rendering", null);

          svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

          t2.selectAll("text").style("fill-opactiy", 0);

          t1.selectAll("rect").call(rect);
          t2.selectAll("rect").call(rect);

          t1.selectAll("text").call(text).style("fill-opacity", 0);
          t2.selectAll("text").call(text).style("fill-opactiy", 1);

          t1.remove().each("end", function() {
            svg.style("shape-rendering", "crispEdges");
            transitioning = false;
          });

          setTimeout(function(){

            g2.append("text")
              .filter(function(d) { return d.category === "parent" })
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "0.75em")
              .call(text)
              .each(addText)
              .style("fill-opacity", 1);

            }, 800)
          }
        return g;
      }

      function text(text) {
        text.attr("x", function(d) { return x(d.x) + 6; })
          .attr("y", function(d) { return y(d.y) + 6; })
          .attr("fill", function(d) { return 'black' });
      }

      function rect(rect) {

        rect.attr("x", function(d) { return x(d.x); })
          .attr("y", function(d) { return y(d.y); })
          .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
          .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
          .attr("fill", function(d) {
              if (d.support === "Support" && d.category === "grandparent") {
                var max = 150;
                var min = 100;
                var green = Math.floor(Math.random() * (max - min + 1)) + min;
                return "rgb(0," + green + ",0)";
              } else if (d.support === "Oppose" && d.category === "grandparent") {
                var max = 150;
                var min = 100;
                var red = Math.floor(Math.random() * (max - min + 1)) + min;
                return "rgb(" + red + ",0,0)";
              } else {
                return randomColor();
              }
          });
      }
      function name(d) {
        return d.parent ? name(d.parent) + "." + d.name : d.name;
      }
    })
  }

  close() {
    this.exitEmit.emit({
      exit: true
    });
  }

  public openFec(lin_ima){
    console.log("Open FEC: ", lin_ima);
    window.open("http://"+lin_ima);
  }

}