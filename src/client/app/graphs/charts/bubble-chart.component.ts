import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {SpinnerComponent} from '../../loading/spinner.component';

@Component({
  selector: 'bubble-chart',
  template: `

        <spinner [isRunning]="isRequesting">
        </spinner>
        <div id="chart3">
        </div>
  `,
  styles: [`

    spinner {
      position: absolute;
      top: 30%;
      height: 100%;
      width: 100%;
    }


    #chart3 {
      position: absolute;
      display: flex;
      margin: 0 auto;
      justify-content: center;
      align-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

    }

  `],
   directives: [SpinnerComponent]
})
export class BubbleComponent implements OnInit {
  @Input() cmte: string;
  @Output() exitEmit = new EventEmitter();
  @Output() indivEmit = new EventEmitter();
  public isRequesting: boolean=true;

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

    d3.selectAll("#chart3 > *").remove();

    var diameter = document.getElementById('chart3').offsetWidth,
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
      .style("position", "fixed")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "#FCFCFC")
      .style("padding", "8px")
      .style("border-radius", "10px")
      .style("font", "14px sans-serif")
      .style("box-shadow", "4px 4px 10px rbga(0, 0, 0, 0.4)")
      .text("tooltip");

    d3.json("/api/individuals/bubble/"+cmte, function(error, root) {
      ctrl.isRequesting = false;
      console.log("Bubble Root: ", root.data[0]);
      var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(JSON.parse(root.data[0])))
          .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          console.log(d);
          return "translate(" +
            d.x + "," +
            d.y + ")"; });

      node.append("circle")
        .attr("r", function(d) { console.log(d); return d.r; })
        .style("fill", function(d) { return getRandomColor(); })
        .on("mouseover", function(d) {
          tooltip.text(d.className + ": " + format(d.value));
          tooltip.style("visibility", "visible");
          d3.select(this).style("fill", "#73877B")
        })
        .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).style("fill", function(d) { return getRandomColor(); });
          return tooltip.style("visibility", "hidden"); })
        .on("click", function(d) {
          var indiv = {
            NAME: d.className,
            TRAN_ID: d.TRAN_ID
          }
          ctrl.changeIndiv(indiv);
        });

      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(function(d) {
          if (!!d.className){
            return d.className.substring(0, d.r / 3);
          } else {
            return "";
          }
        });
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

  changeIndiv(indiv) {
    console.log("Change Indiv bubble chart ", indiv);
    this.indivEmit.emit({
      transaction: indiv.TRAN_ID,
      name: indiv.NAME
    })
  }
}