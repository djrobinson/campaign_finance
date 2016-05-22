import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {GraphService} from '../api_services/graph.service';
import {TitleService} from '../api_services/title.service';
import {CandidateTableComponent} from '../candidate/candidate-table.component';
import {MiniProfileComponent} from './mini-profile.component.ts';
import {IndividualPopupComponent} from './individual-popup.component.ts';
import {CommitteePopupComponent} from './committee-popup.component.ts';

@Component({
  selector: 'graph-view',
  template: `
            <div class="row">
              <candidate-table
                [candidates]="candidates"
                [graph]="graph"
                (buildEmit)="getGraphData($event.candId)"
              >
              </candidate-table>
              <p>{{candId}}</p>
              <div class="force-container">
              </div>
            </div>
            <div *ngIf="selectedNode">
              <mini-profile-view
                [node]="selectedNode"
                (indivEmit)="showIndivPopup($event)"
                (cmteEmit)="showCmtePopup($event)">
              </mini-profile-view>
            </div>
            <div *ngIf="indivPopup">
              <individual-popup
                [individualTran]="individualTran"
                [indivName]="indivName"
                (exitEmit)="exit()">
              </individual-popup>
            </div>
            <div *ngIf="cmtePopup">
              <committee-popup
                [committee]="selectedCommittee"
                (exitEmit)="exit()">
              </committee-popup>
            </div>
           `,
  styles: [
    `
    inputs-view {
      position: absolute;
      left: 0;
      top: 0;
      width: 15%;
      height: 100vh;
      background-color: blue;
    }
    mini-profile-view {
      position: absolute;
      bottom: 0;
      height: 200px;
      width: 70%;
      margin-left: 15%;
      background-color: blue;
    }
    outputs-view {
      position: absolute;
      top: 0;
      right: 0;
      width: 15%;
      height: 100vh;
      background-color: blue;
    }
    individual-popup {
      position: absolute;
      width: 60%;
      height: 60%;
      top: 30%;
      left: 20%;
      background-color: blue;
    }
    committee-popup {
      position: absolute;
      width: 90%;
      height: 80%;
      top: 10%;
      left: 5%;
      background-color: blue;
    }
  `
  ],
  providers: [GraphService, TitleService],
  directives: [CandidateTableComponent, MiniProfileComponent, IndividualPopupComponent, CommitteePopupComponent]
})
export class GraphComponent implements OnInit  {
  selectedNode: Object;
  candidate: Object;
  indivPopup: boolean;
  cmtePopup: boolean;
  individualTran: string;
  indivName: string;
  selectedCommittee: string;
  result: Object;
  nodeData = Array;
  linkData = Array;
  graph: boolean;
  constructor(
    private _graphService: GraphService,
    private _TitleService: TitleService
    ) {
    this.graph = true;

  }

  ngOnInit() {
    this._TitleService.getResult('/api/candidates')
        .subscribe(
          result => { this.candidates = result },
          error => console.error('Error: ' + error),
          () => {}
        )
  }

  showIndivPopup(event){
    this.indivName = event.name;
    this.indivPopup = true;
    this.individualTran = event.tranId;
    this.selectedNode = false;
  }

  showCmtePopup(event){
    console.log("Cmte emitted", event);
    this.cmtePopup = true;
    this.selectedCommittee = event.cmte;
    this.selectedNode = false;
  }

  exit(){
    console.log("EXIT!");
    this.indivPopup = false;
    this.selectedNode = false;
    this.cmtePopup = false;
  }

  getGraphData(candId) {
    console.log("get graph data");

    this._TitleService.getResult('/api/candidates/'+candId)
      .subscribe(
      result => { this.candidate = result },
      error => console.error('Error: ' + err),
      () => { }
      )
    var cand = candId;
    var graph = this._graphService;
    graph.getResult(cand)
      .subscribe(
      result => {
        result.unshift({ "CANDIDATE": cand, "CAND_ID": cand, "CMTE_ID": cand, "NODE": 0, "graphtype": "candidate", data: this.candidate[0]});
        console.log(result);
        this.result = result;

        this.nodeData = result.map((elem, i)=>{
          if (elem.CAND_ID){
            elem.CORE = true;
          }

          elem.NODE = i;
          return elem;
        });
        var nodeData = this.nodeData;
        console.log("Node Data! ", this.nodeData);
        this.linkData = nodeData.reduce((prev, elem)=>{
          if (elem.CAND_ID){
            prev.push({ "source": elem.NODE, "target": 0, "value": 1 })
            return prev;
          } else if (elem.OTHER_ID) {
            nodeData.forEach((el, i) => {
              if (el.CORE && el.CMTE_ID === elem.CMTE_ID ){
                prev.push({ "source": elem.NODE, "target": i, "value": 2 })
                return prev;
              } else if (elem.CMTE_ID === el.OTHER_ID){
                prev.push({ "source": elem.NODE, "target": i, "value": 3 })
                return prev;
              } else if (el.com_id === elem.OTHER_ID){
                prev.push({ "source": elem.NODE, "target": i, "value": 2 })
                return prev;
              }
            })
            return prev;
          } else {
            nodeData.forEach((el, i) => {
              if (el.OTHER_ID === elem.CMTE_ID ){
                prev.push({ "source": elem.NODE, "target": i, "value": 3 })
                return prev;
              }
            })
            return prev;
          }

        }, [])
        console.log(this.linkData);
        this.buildGraph(this);
        },
        error => console.error('Error: ' + err),
        () => {
          console.log('Completed!')
        }
      );
  }

  setSelected(selected:string) {
    console.log(selected);
    this.selectedNode = selected;
  }

  buildGraph(ctrl) {
    console.log();
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
    d3.select("candidate-table").remove();
    var svg = d3.select(".force-container").append("svg")
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
      .gravity(.05)
      .size([width, height])
      .nodes(this.nodeData)
      .links(this.linkData)
      .distance(150)
      .charge(-1000)
      .start();

    var link = container.append("g")
      .selectAll(".link")
      .data(this.linkData)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke-width", 1)
      .style("stroke", "gray");


    var node = container.append("g")
      .selectAll(".node")
      .data(this.nodeData)
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
      .attr("dx", "-5rem")
      .attr("dy", "-1.5rem")
      .style("fill", "blue")
      .style("font-size", ".5rem")
      .text(function(d) { return d.CANDIDATE || d.NAME || d.CMTE_NM; });

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
    this.linkData.forEach(function(d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    function isConnected(a, b) {
      return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
    }

    node.on("mouseover", function(d) {

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
    })

    .on("mouseout", function(d) {

      node.classed("node-active", false);
      link.classed("link-active", false);

      d3.select(this).select("circle").transition()
        .duration(750);
    })

    .on("click", function(d){
      console.log(d);
      ctrl.setSelected(d);
    })

  }

}