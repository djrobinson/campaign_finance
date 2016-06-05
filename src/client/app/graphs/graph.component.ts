import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {GraphService} from '../api_services/graph.service';
import {TitleService} from '../api_services/title.service';
import {CandidateTableComponent} from '../candidate/candidate-table.component';
import {MiniProfileComponent} from './mini-profile.component.ts';
import {IndividualPopupComponent} from './individual-popup.component.ts';
import {CommitteePopupComponent} from './committee-popup.component.ts';
import {CandidatePopupComponent} from './candidate-popup.component.ts';
import {CongressPopupComponent} from './congress-popup.component.ts';
import {TreemapComponent} from './charts/treemap.component.ts';

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
                (cmteEmit)="showCmtePopup($event)"
                (candEmit)="showCandPopup($event)"
                (congressEmit)="showCongressPopup($event)">
              </mini-profile-view>
            </div>
            <div *ngIf="indivPopup">
              <individual-popup
                [individualTran]="individualTran"
                [indivName]="indivName"
                (exitEmit)="exit()">
              </individual-popup>
            </div>
            <div *ngIf="fullTreemap">
              <div class="tree-close">
                <button (click)="closeTreemap()">Close</button>
              </div>
              <treemap route="{{fullRoute}}">
              </treemap>

            </div>
            <div *ngIf="cmtePopup">
              <committee-popup
                [committee]="selectedCommittee"
                (exitEmit)="exit()"
                (cmteEmit)="changeCmte($event)"
                (indivEmit)="changeIndiv($event)">
              </committee-popup>
            </div>
            <div *ngIf="candPopup">
              <candidate-popup
                [candidate]="selectedCandidate"
                (exitEmit)="exit()"
                (cmteEmit)="changeCmte($event)"
                (treemapEmit)="showTreemap($event)"
              >
              </candidate-popup>
            </div>
            <div *ngIf="congressPopup">
              <congress-popup
                [candidate]="selectedCandidate"
                (exitEmit)="exit()"
                (cmteEmit)="changeCmte($event)"
              >
              </congress-popup>
            </div>
           `,
  styles: [
    `

    .tree-close {
      position: absolute;
      top: 0;
      width: 100%;
      text-align: center;
    }
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
      width: 70%;
      margin-left: 15%;
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
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
    committee-popup {
      position: absolute;
      width: 90%;
      height: 80%;
      top: 10%;
      left: 5%;
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
    candidate-popup {
      position: absolute;
      width: 90%;
      height: 90%;
      top: 5%;
      left: 5%;
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
    treemap {
      position: absolute;
      z-index: 5;
      width: 90%;
      height: 90%;
      top: 5%;
      left: 5%;
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
    congress-popup {
      position: absolute;
      width: 90%;
      height: 90%;
      top: 5%;
      left: 5%;
      border: solid 1px #75717B;
      background-color: #FEFFFE;
    }
    circle {
      stroke: black;
      stroke-width: 1.5px;
    }
  `
  ],
  providers: [GraphService, TitleService],
  directives: [CandidateTableComponent, MiniProfileComponent, IndividualPopupComponent, CommitteePopupComponent, CandidatePopupComponent, CongressPopupComponent, TreemapComponent]
})
export class GraphComponent implements OnInit  {
  private selectedNode: Object;
  private candidate: Object;
  private indivPopup: boolean;
  private cmtePopup: boolean;
  private individualTran: string;
  private indivName: string;
  private selectedCommittee: string;
  private result: Object;
  private nodeData = Array;
  private linkData = Array;
  private graph: boolean;
  private fullRoute: string = "";
  private fullTreemap: boolean;

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

  showTreemap(event){
    this.fullRoute = event.route;
    this.fullTreemap = true;
  }

  closeTreemap(){
    this.fullTreemap = false;
  }

  showCmtePopup(event){
    this.cmtePopup = true;
    this.selectedCommittee = event.cmte;
    this.selectedNode = false;
  }

  showCandPopup(event){
    this.candPopup = true;
    this.selectedCandidate = event.cand;
    this.selectedNode = false;
  }

  showCongressPopup(event) {
    console.log("Congress event emitted ", event);
    this.congressPopup = true;
    this.selectedCandidate = event.cand;
    this.selectedNode = false;
  }

  changeCmte(event){
    console.log("Change cmte event emmitted ", event);
    this.candPopup = false;
    this.congressPopup = false;
    this.cmtePopup = true;
    this.selectedCommittee = event.cmte;
    this.selectedNode = false;
  }

  changeIndiv(event) {
    console.log("Change cmte event emmitted ", event);
    this.cmtePopup = false;
    this.indivPopup = true;
    this.indivName = event.name;
    this.individualTran = event.transaction;
    this.selectedNode = false;
  }


  exit(){
    this.indivPopup = false;
    this.selectedNode = false;
    this.cmtePopup = false;
    this.candPopup = false;
    this.congressPopup = false;
  }

  getGraphData(candId) {

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
        this.result = result;

        this.nodeData = result.map((elem, i)=>{
          if (elem.CAND_ID){
            elem.CORE = true;
          }

          elem.NODE = i;
          return elem;
        });
        var nodeData = this.nodeData;
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
      .attr("stroke-width", 3)
      .style("stroke", "gray");



    var node = container.append("g")
      .selectAll(".node")
      .data(this.nodeData)
      .enter().append("g")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .call(drag)
      .style("stroke", "black")
      .style("fill", function(d){
        if ( d.graphtype === "candidate" ){
          return "none";
        } else if ( d.graphtype === "committee" || d.graphtype === "associated"){
          switch (d.CMTE_TP){
            case "C":
              return "#FE7F2D";
            case "D":
              return "#619B8A";
            case "E":
              return "#D741A7";
            case "H":
              return "#E6F14A";
            case "I":
              return "#575D90";
            case "N":
              return "#C3D350";
            case "O":
              return "#273D1D";
            case "P":
              return "#385B28";
            case "Q":
              return "#1E2EDE";
            case "S":
              return "#3A1772";
            case "U":
              return "#5398BE";
            case "V":
              return "#4E3822";
            case "W":
              return "#2F1B25";
            case "X":
              return "#DCABDF";
            case "Y":
              return "#C792DF";
            case "Z":
              return "#95C623";
              break;
          }
        } else if ( d.graphtype === "individual"){
          return "#6D0033";
        }
      })

    node.append("circle")
      .attr("class", "circle")
      .attr("r",function(d) {
        if ( d.graphtype === "candidate") {
          return 40;
        } else if ( d.graphtype === "committee" || d.graphtype === "associated"){
          return 20;
        } else {
          return 10;
        }

      })


    var candNode = svg.selectAll(".node")
      .filter(function(d) { return d.graphtype === "candidate" });

    console.log(candNode);

    candNode.append("image")
      .attr("xlink:href", "https://raw.githubusercontent.com/djrobinson/campaign_finance/master/candidates/P00003392.jpg")
      .attr("x", -35)
      .attr("y", -35)
      .attr("width", 70)
      .attr("height", 70);


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