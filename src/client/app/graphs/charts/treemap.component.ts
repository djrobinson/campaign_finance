import {Component, Input, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'treemap',
  template: `
    <div class="row">
      <div class="table-div" id="containerChart">
        <div id="chart"></div>
      </div>
    </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }
    #containerChart {
      height: 400px;
      width: 400px;
    }
  `]
})
export class TreemapComponent implements OnInit, OnChanges {
  //May want to start creating individual/committee types.

private rootData = {
  "children": [
    {
      "children": [
        {
          "rate": -0.4066358024691358,
          "value": 769,
          "name": "Black or African American, Non-Hispanic"
        },
        {
          "rate": -0.35092180546726004,
          "value": 1021,
          "name": "Hispanic or Latino"
        },
        {
          "rate": -0.44886363636363635,
          "value": 291,
          "name": "White, Non-Hispanic"
        },
        {
          "rate": -0.4716981132075472,
          "value": 28,
          "name": "American Indian or Alaska Native, Non-Hispanic"
        },
        {
          "rate": -0.234860883797054,
          "value": 935,
          "name": "Asian or Pacific Islander, Non-Hispanic"
        }
      ],
      "rate": -0.348458904109589,
      "name": "25-44 years"
    },
    {
      "children": [
        {
          "rate": -0.36470588235294116,
          "value": 324,
          "name": "Black or African American, Non-Hispanic"
        },
        {
          "rate": -0.06147540983606557,
          "value": 458,
          "name": "Hispanic or Latino"
        },
        {
          "rate": -0.3368055555555556,
          "value": 573,
          "name": "White, Non-Hispanic"
        },
        {
          "rate": 0.14285714285714285,
          "value": 32,
          "name": "American Indian or Alaska Native, Non-Hispanic"
        },
        {
          "rate": 0.010443864229765013,
          "value": 774,
          "name": "Asian or Pacific Islander, Non-Hispanic"
        }
      ],
      "rate": -0.18637048192771086,
      "name": "65+ years"
    },
    {
      "children": [
        {
          "rate": -0.4,
          "value": 72,
          "name": "Black or African American, Non-Hispanic"
        },
        {
          "rate": -0.4645669291338583,
          "value": 68,
          "name": "Hispanic or Latino"
        },
        {
          "rate": -0.20833333333333334,
          "value": 19,
          "name": "White, Non-Hispanic"
        },
        {
          "rate": 1.4,
          "value": 12,
          "name": "American Indian or Alaska Native, Non-Hispanic"
        },
        {
          "rate": 0.18604651162790697,
          "value": 51,
          "name": "Asian or Pacific Islander, Non-Hispanic"
        }
      ],
      "rate": -0.30407523510971785,
      "name": "5-14 years"
    },
    {
      "children": [
        {
          "rate": -0.5954198473282443,
          "value": 53,
          "name": "Black or African American, Non-Hispanic"
        },
        {
          "rate": -0.5423076923076923,
          "value": 119,
          "name": "Hispanic or Latino"
        },
        {
          "rate": -0.575,
          "value": 17,
          "name": "White, Non-Hispanic"
        },
        {
          "rate": 0.75,
          "value": 7,
          "name": "American Indian or Alaska Native, Non-Hispanic"
        },
        {
          "rate": 0.2391304347826087,
          "value": 57,
          "name": "Asian or Pacific Islander, Non-Hispanic"
        }
      ],
      "rate": -0.47401247401247404,
      "name": "0-4 years"
    },
    {
      "children": [
        {
          "rate": -0.39619651347068147,
          "value": 762,
          "name": "Black or African American, Non-Hispanic"
        },
        {
          "rate": -0.1719260065288357,
          "value": 761,
          "name": "Hispanic or Latino"
        },
        {
          "rate": -0.2727272727272727,
          "value": 608,
          "name": "White, Non-Hispanic"
        },
        {
          "rate": -0.23809523809523808,
          "value": 48,
          "name": "American Indian or Alaska Native, Non-Hispanic"
        },
        {
          "rate": -0.05090137857900318,
          "value": 895,
          "name": "Asian or Pacific Islander, Non-Hispanic"
        }
      ],
      "rate": -0.2358936117325379,
      "name": "45-64 years"
    },
    {
      "children": [
        {
          "rate": -0.3829268292682927,
          "value": 253,
          "name": "Black or African American, Non-Hispanic"
        },
        {
          "rate": -0.46920821114369504,
          "value": 362,
          "name": "Hispanic or Latino"
        },
        {
          "rate": -0.3368421052631579,
          "value": 63,
          "name": "White, Non-Hispanic"
        },
        {
          "rate": 0.6363636363636364,
          "value": 18,
          "name": "American Indian or Alaska Native, Non-Hispanic"
        },
        {
          "rate": -0.06116207951070336,
          "value": 307,
          "name": "Asian or Pacific Islander, Non-Hispanic"
        }
      ],
      "rate": -0.3422950819672131,
      "name": "15-24 years"
    }
  ],
  "rate": -0.28656039777712783,
  "name": "2006 to 2012"
}

  ngOnInit(){
    this.buildTreeMap(this.rootData);
  }

  buildTreeMap(root) {
    var margin = { top: 30, right: 0, bottom: 20, left: 0 },
      width = document.getElementById('containerChart').offsetWidth;
    height = document.getElementById('containerChart').offsetHeight;
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


    // Aggregate the values for internal nodes. This is normally done by the
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
      .attr("fill", function(d) { return color(colorIncrements(d)) })
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
    start(root);

    function start(root) {
      console.log(root)
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
          .attr("fill", function() { console.log(color(d.support)); return color(d['support']) })

        var g1 = svg.insert("g", ".grandparent")
          .datum(d)
          .attr("class", "depth");

        var g = g1.selectAll("g")
          .data(d._children)
          .enter().append("g");

        g.filter(function(d) { return d._children; })
          .classed("children", true)
          .on("click", transition);

        g.selectAll(".child")
          .data(function(d) { return d._children || [d]; })
          .enter().append("rect")
          .attr("class", "child")
          .call(rect);

        g.append("rect")
          .attr("class", "parent")
          .call(rect)
          .append("title")
          .text(function(d) { console.log(typeof (d.value), d.value); return d.name + ', Cases of TB: ' + d.value + ', percent change: ' + formatNumber(d.support); });

        g.append("text")
          .attr("dy", ".75em")
          .text(function(d) { return d.name; })
          .call(text);

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
          g2.selectAll("text").style("fill-opacity", 0);

          // Transition to the new view.
          t1.selectAll("text").call(text).style("fill-opacity", 0);
          t2.selectAll("text").call(text).style("fill-opacity", 1);
          t1.selectAll("rect").call(rect);
          t2.selectAll("rect").call(rect);

          // Remove the old node when the transition is finished.
          t1.remove().each("end", function() {
            svg.style("shape-rendering", "crispEdges");
            transitioning = false;
          });
        }

        return g;
      }

      function text(text) {
        text.attr("x", function(d) { return x(d.x) + 6; })
          .attr("y", function(d) { return y(d.y) + 6; })
          .attr("fill", function(d) { return getContrast50(color(parseFloat(d.support))) });
      }

      function rect(rect) {
        rect.attr("x", function(d) { return x(d.x); })
          .attr("y", function(d) { return y(d.y); })
          .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
          .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
          .attr("fill", function(d) { return color(parseFloat(d.rate)); });
      }

      function name(d) {
        return d.parent
          ? name(d.parent) + "." + d.name
          : d.name;
      }
    }
  }


  close() {
    console.log("CLOSE");
    this.exitEmit.emit({
      exit: true
    });
  }

}