import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';

@Component({
  selector: 'bubble-chart',
  template: `
      <div id="containerChart3">
        <div (click)="close()" class="close-button">
          <img src="/images/close.png" class="close-icon" />
        </div>
        <div id="chart3">
        </div>
      </div>
  `,
  styles: [`

    .close-button {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 25px;
      width: 25px;
    }

    .close-icon {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 25px;
      width: 25px;
    }

    #containerChart3 {
      display: flex;
      justify-items: center;
      height: 100%;
      width: 100%;
      background-color: #ABA4A3;
    }

    #chart3 {
      display: block;
      margin: 0 auto;
    }

  `]
})
export class BubbleComponent implements OnInit {
  @Input() cmte: string;
  @Output() exitEmit = new EventEmitter();

  ngOnInit(){
    console.log(this.cmte);
    this.buildBubbles(this.cmte, this);
  }


  public buildBubbles(cmte, ctrl){
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    var diameter = document.getElementById('containerChart3').offsetHeight,
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
      .style("font", "8px sans-serif")
      .text("tooltip");

    d3.json("/api/individuals/bubble/"+cmte, function(error, root) {
      var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(root))
          .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("circle")
        .attr("r", function(d) { console.log(d); return d.r; })
        .style("fill", function(d){ return getRandomColor(); })
        .on("mouseover", function(d) {
          tooltip.text(d.className + ": " + format(d.value));
          tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })
        .on("mouseout", function() { return tooltip.style("visibility", "hidden"); })
        .on("click", function(d) { console.log(d.TRAN_ID);})

      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(function(d) { return d.className.substring(0, d.r / 3); });
    });

    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else classes.push({ packageName: name, className: node.name, value: node.size, TRAN_ID: node.TRAN_ID });
      }

      recurse(null, root);
      return { children: classes };
    }

    d3.select(self.frameElement).style("height", diameter + "px");

  }


  close() {
    console.log"CLOSING!");
    this.exitEmit.emit({
      exit: true
    });
  }
}