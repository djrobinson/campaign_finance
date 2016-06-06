import {Component, Input, OnInit} from 'angular2/core';

@Component({
  selector: 'bubble-chart',
  template: `
      <h4>Bubble Chart</h4>
      <div id="containerChart3">
        <div id="chart3">
        </div>
      </div>
  `,
  styles: [`
    .indiv {
      text-align: center;
    }

    #containerChart2 {
      height: 100%;
      width: 100%;
    }

  `]
})
export class BubbleComponent implements OnInit {
  @Input() cmte: string;

  ngOnInit(){
    console.log(this.cmte);
    this.buildBubbles(this.cmte);
  }

  public buildBubbles(cmte){
    var diameter = document.getElementById('containerChart3').offsetWidth,
      format = d3.format(",d"),
      color = d3.scale.category20c();

    var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select("#chart3").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    var tooltip = d3.select("#chart3")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("border-radius", "6px")
      .style("font", "12px sans-serif")
      .text("tooltip");

    d3.json("/api/individuals/bubble/"+cmte, function(error, root) {
      var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(root))
          .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.packageName); })
        .on("mouseover", function(d) {
          tooltip.text(d.className + ": " + format(d.value));
          tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })
        .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(function(d) { return d.className.substring(0, d.r / 3); });
    });

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else classes.push({ packageName: name, className: node.name, value: node.size });
      }

      recurse(null, root);
      return { children: classes };
    }

    d3.select(self.frameElement).style("height", diameter + "px");

  }
}