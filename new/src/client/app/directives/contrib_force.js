angular.module('campaignApp')

.directive('contribForce', function($parse) {
  return {
    restrict : 'E',
    template: '<div class="forceContainer"></div>',
    controller: 'forceCtrl',
    link : function($scope, element, attr) {
      $scope.buildGraph = function(){
      console.log($scope.linkData);
      //HELPER FUNCTIONS FOR GRAPH
      function dottype(d) {
        d.x = +d.x;
        d.y = +d.y;
        return d;
      }

      function zoomed() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }

      function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();

        d3.select(this).classed("dragging", true);
        force.start();
      }

      function dragged(d) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
      }

      function dragended(d) {
        d3.select(this).classed("dragging", false);
      }

      var height = 900;
      var width = 1600;

      //BEHAVIOR SETUP FOR FORCE GRAPH. USES HELPER FUNCTIONS BELOW
        var zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        var drag = d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", function(d) {
              d3.event.sourceEvent.stopPropagation();
              d3.select(this).classed("dragging", true);
              force.start();
            })
            .on("drag", dragged)
            .on("dragend", dragended);


      //SETS UP AREA OF THE FORCE LAYOUT
        var svg = d3.select(".forceContainer").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g") //< added
            .call(zoom);

        var rect = svg.append("rect") //<= Added
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all");

        var container = svg.append("g");

      //STARTS FORCE LAYOUT. ADDS DATA, CREATES LINKS AND NODES
        var force = d3.layout.force()
            .gravity(.1)
            .size([width, height])
            .nodes($scope.nodeData)
            .links($scope.linkData)
            .charge(-100)
            .linkDistance(150)
            .start();

        var link = container.append("g")
            .selectAll(".link")
            .data($scope.linkData)
            .enter().append("line")
            .attr("class", "link")
            .attr("stroke-width", 1)
            .style("stroke", "gray");


        var node = container.append("g")
            .selectAll(".node")
            .data($scope.nodeData)
            .enter().append("g")
            .attr("class", "node")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .call(drag);
            // .style("fill", function(d){
            //   if ( d.party === undefined ){
            //     return "black";
            //   } else if ( d.party === "R"){
            //     return "#742121";
            //   } else if ( d.party === "D"){
            //     return "#29339B";
            //   }
            // })
            // .call(drag);

        node.append("circle")
            .attr("r", 10)
            .attr("class", "circle");
            // .attr("r",function(d) {
            //   if ( d.type === "pres") return 40;
            //   if ( d.type === "committee") return 20;
            //   return 10;
            // })
            // .attr("id", function(d){
            //   return d.id;
            // })
            // .attr("class", "circle");


        node.append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .style("fill", "black")
            .text(function(d) { return d.name; });

        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; })

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


        });

      //ATTRIBUTE CHANGES TO NODES AND LINKS
        // force.charge(function(d){
        //     if(d.type === "anchor") return 10;
        //     if(d.type === "pres") return -100;
        //     if(d.type === "committee") return -1000;
        //     return -1000;
        // })
        // force.linkDistance(function(link){
        //     if(link.type === "anchor") return 10;
        //     if(link.type === "pres") return 30;
        //     if(link.type === "committee") return 200;
        //     return 50;
        // })

        // force.linkStrength(function(link){
        //     if(link.type === "anchor") return 100;
        //     if(link.type === "pres") return 5;
        //     return 0.1;
        // })




      //NODE EFFECTS & RELATION MGT
        var linkedByIndex = {};
        $scope.linkData.forEach(function(d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

        function isConnected(a, b) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
        }

        node.on("mouseover", function(d){

          node.classed("node-active", function(o) {
              thisOpacity = isConnected(d, o) ? true : false;
              this.setAttribute('fill-opacity', thisOpacity);
              return thisOpacity;
          });

          link.classed("link-active", function(o) {
              return o.source === d || o.target === d ? true : false;
          });

          d3.select(this).classed("node-active", true);
          d3.select(this).select("circle").transition()
                  .duration(750)
                  .attr("r", (d.weight * 2+ 12)*1.5);
        })

        .on("mouseout", function(d){

                node.classed("node-active", false);
                link.classed("link-active", false);

                d3.select(this).select("circle").transition()
                        .duration(750)
                        .attr("r", d.weight * 2+ 12);
        });

      //THIS WILL ESCAPE THE DROPDOWNS! USED HERE BECAUSE IT WOULDN'T WORK OUTSIDE
      //OF THE RECT BEING DEFINED
        // $("rect").on("click", function(){
        //   $("#presHolder").slideUp('slow');
        //   $("#holder").slideUp('slow');
        //   $("#employeeSel").slideUp('slow');
        // });

        // $('svg').on('click', function(e){
        //   var Elem = e.target;

        //   if (Elem.classList[0] === "circle"){
        //     click(Elem.id);
        //   }
        // });
      }
    }
  };
});