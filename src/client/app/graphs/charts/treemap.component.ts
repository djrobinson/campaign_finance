import {Component, Input, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'treemap',
  template: `
      <div id="containerChart">
        <div id="tooltip">
          <div id="tip-name"></div>
          <div id="tip-support"></div>
          <div id="tip-value"></div>
          <div id="tip-purpose"></div>

        </div>
        <div id="chart"></div>
      </div>
  `,
  styles: [`

    #containerChart {
      position: absolute;
      height: 90%;
      width: 100%;
    }
    rect {
      stroke: black;
      stroke-width: 1px;
    }

    #tooltip {
      position: absolute;
      text-align: center;
      width: 30%;
      height: 100%;
      bottom: 0;
      font-size: 2rem;
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
      font-size: 2rem;
    }
  `]
})
export class TreemapComponent implements OnInit, OnChanges {
  @Input() route: string;


  constructor (){
    this.parseFloat = function(num) {
      return parseFloat(num);
    }
  }

  ngOnInit(){
    this.buildTreeMap(this.route);
  }

  rebuildMap(route){
    d3.selectAll("svg").remove();
    this.buildTreeMap(route);
  }

  buildTreeMap(route) {

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

    var randomColor = (function() {
      var golden_ratio_conjugate = 0.618033988749895;
      var h = Math.random();

      var hslToRgb = function(h, s, l) {
        var r, g, b;

        if (s == 0) {
          r = g = b = l; // achromatic
        } else {
          function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
      };

      return function() {
        h += golden_ratio_conjugate;
        h %= 1;
        return hslToRgb(h, 0.5, 0.60);
      };
    })();

    var width = document.getElementById('chart').offsetWidth;
    var height = document.getElementById('chart').offsetHeight;
    var margin = { top: 30, right: 0, bottom: 0, left: 0 };

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

    grandparent.append("rect")
      .attr("y", -margin.top)
      .attr("width", width)
      .attr("height", margin.top);

    grandparent.append("text")
      .attr("x", 6)
      .attr("y", 6 - margin.top)
      .attr("dy", ".75em");

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


    // Aggregate the amounts for internal nodes. This is normally done by the
    // treemap layout, but not here because of our custom implementation.
    // We also take a snapshot of the original children (_children) to avoid
    // the children being overwritten when when layout is computed.
    function accumulate(d) {
      return (d._children = d.children)
        // recursion step, note that p and v are defined by reduce
        ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : d.value;
    }



    // Compute the treemap layout recursively such that each group of siblings
    // uses the same size (1×1) rather than the dimensions of the parent cell.
    // This optimizes the layout for the current zoom state. Note that a wrapper
    // object is created for the parent node for each group of siblings so that
    // the parent’s dimensions are not discarded as we recurse. Since each group
    // of sibling was laid out in 1×1, we must rescale to fit using absolute
    // coordinates. This lets us use a viewport to zoom.
    function layout(d) {
      if (d._children) {
        // treemap nodes comes from the treemap set of functions as part of d3
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

    legend.append("rect")
      .attr("x", function(d) { return margin.left + d * 40 })
      .attr("y", 0)
      .attr("fill", function(d) {
        return 'gray';
       })
      .attr('width', '40px')
      .attr('height', '40px')


    legend.append("text")
      .text(function(d) { return formatNumber(colorIncrements(d)) })
      .attr('y', 20)
      .attr('x', function(d) { return margin.left + d * 40 + 20 });

    // determines if white or black will be better contrasting color
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
        grandparent
          .datum(d.parent)
          .on("click", transition)
          .select("text")
          .text(name(d))


        // color header based on grandparent's rate
        grandparent
          .datum(d.parent)
          .select("rect")
          .attr("fill", function() {
            return 'gray';
          })


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
          var size = 12;
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
              .attr("dy", "1em")
            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.to)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "1em")
            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.purpose)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "1em")
            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.amount)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "1em")
            d3.select(this)
              .append("tspan")
              .attr("class", "child-tspan")
              .text(d.date)
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "1em")
            d3.select(this)
              .append("a")
              .attr("xlink:href", function(d) { return "http://"+d.fec; })
              .append("tspan")
              .attr("x", 0)
              .attr("dx", "0.35em")
              .attr("dy", "1em")
              .text("FEC Link")
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
            d3.select('#tip-amount').text(d.value.formatMoney(2));
            d3.select('#tip-support').text(d.support);
            d3.select('#tip-purpose').text(d.purpose);
          })

        function transition(d) {
          if (transitioning || !d) return;
          transitioning = true;

          var g2 = display(d),
            t1 = g1.transition().duration(750),
            t2 = g2.transition().duration(750);


          // Update the domain only after entering new elements.
          x.domain([d.x, d.x + d.dx]);
          y.domain([d.y, d.y + d.dy]);


          // Enable anti-aliasing during the transition.
          svg.style("shape-rendering", null);

          // Draw child nodes on top of parent nodes.
          svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });


          // Fade-in entering text.
          t2.selectAll("text").style("fill-opactiy", 0);
          // Transition to the new view.

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

            // Remove the old node when the transition is finished.

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

}