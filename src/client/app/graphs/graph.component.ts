import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {GraphService} from '../api_services/graph.service';
import {CandidateTableComponent} from '../candidate/candidate-table.component';
import {MiniProfileComponent} from './mini-profile/mini-profile.component.ts';
import {IndividualPopupComponent} from './individual-popup/individual-popup.component.ts';
import {CommitteePopupComponent} from './committee-popup/committee-popup.component.ts';
import {CandidatePopupComponent} from './candidate-popup/candidate-popup.component.ts';
import {TreemapComponent} from './charts/treemap.component.ts';
import {BubbleComponent} from './charts/bubble-chart.component';
import {BarComponent} from './charts/bar-chart.component';
import {SpinnerComponent} from '../loading/spinner.component';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import { Router, RouteParams } from 'angular2/router';
import {LocationStrategy} from  'angular2/router'

@Component({
  selector: 'graph-view',
  templateUrl: 'app/graphs/graph.html',
  styleUrls: ['app/graphs/graph.css'],
  providers: [GraphService],
  directives: [CandidateTableComponent, MiniProfileComponent, IndividualPopupComponent, CommitteePopupComponent, CandidatePopupComponent, TreemapComponent, BubbleComponent, BarComponent, SpinnerComponent]
})
export class GraphComponent implements OnInit  {
  private selectedNode: Object;
  private candidate: Object;
  private candidate_id: string;
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
  private fullBubble: boolean;
  private isRequesting: boolean;
  private bubbleCmte: string;
  private bioguideId: string;
  private selectedCandidate: string;
  private isCand: boolean;
  public absUrl: string;

  constructor(
    private _params: RouteParams,
    private _graphService: GraphService,
    private http: Http,
    private location: LocationStrategy;
    ) {
    this.graph = true;
    this.candidate_id = _params.get('id');
  }

  ngOnInit() {
    this.getGraphData  (this.candidate_id);

    this.absUrl = this.location.path();
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

  showBubble(event){
    this.bubbleCmte = event.cmte;
    this.fullBubble = true;
  }

  closeBubble() {
    this.fullBubble = false;
  }

  closeTreemap(){
    this.fullTreemap = false;
  }

  showCmtePopup(event){
    this.candPopup = true;
    this.isCand = false;
    this.selectedCommittee = event.cmte;
    this.selectedNode = false;
  }

  showCandPopup(event){
    this.candPopup = true;
    this.isCand = true;
    this.selectedCandidate = event.cand;
    this.selectedCommittee = event.cmte_id;
    this.selectedNode = false;
  }

  showCongressPopup(event) {
    this.congressPopup = true;
    this.selectedCandidate = event.cand;
    this.selectedNode = false;
  }

  changeCmte(event){
    this.candPopup = false;
    this.congressPopup = false;
    this.cmtePopup = true;
    this.selectedCommittee = event.cmte;
    this.selectedNode = false;
  }

  changeIndiv(event) {
    this.cmtePopup = false;
    this.indivPopup = true;
    this.indivName = event.name;
    this.individualTran = event.transaction;
    this.selectedNode = false;
    this.fullBubble = false;
  }

  exit(){
    this.indivPopup = false;
    this.selectedNode = false;
    this.cmtePopup = false;
    this.candPopup = false;
    this.congressPopup = false;
  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  public getGraphData(candId): void {
    Observable.forkJoin(
      this.http.get('/api/candidates/' + candId).map((res: Response) => res.json()),
      this.http.get('/api/legislators/' + candId).map((res: Response) => res.json())
    ).subscribe(
      data => {
        this.candidate = data[0];
        this.bioguideId = data[1];
      },
      err => console.error(err)
      )
    var cand = candId;
    var graph = this._graphService;

    this.isRequesting = true;
    graph.getResult(cand)
      .subscribe(
      result => {
        result = result.data;
        this.result = result;
        var nonCand = result.filter((elem) => {
          return elem.CMTE_DSGN !== 'P';
        });

        var candArr = result.filter((elem)=>{
          return elem.CMTE_DSGN === 'P';
        });
        candArr[0].CANDIDATE = cand;
        candArr[0].CAND_ID = cand;
        candArr[0].data = this.candidate[0];
        var resultOrdered = candArr.concat(nonCand);
        this.nodeData = resultOrdered.map((elem, i)=>{
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
        this.buildGraph(this, candId, this.absUrl);
        },
        error => console.error('Error: ' + error  ),
        () => {
          this.stopRefreshing();
        var ctrl = this;
        }
      );
  }


  setSelected(selected:string) {
    this.selectedNode = selected;
  }

  buildGraph(ctrl, candId, absUrl) {
    this.graph = false;
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
    var svg = d3.select("#force")
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
          console.log("Committees data type", d.tot_dis);
          d.tot_dis = +d.tot_dis;
          if (d.tot_dis < 1000)
          {
            return "#c6dbef";
          }
          else if (d.tot_dis < 5000)
          {
            return "#9ecae1";
          }
          else if (d.tot_dis < 10000)
          {
            return "#6baed6";
          }
          else if (d.tot_dis < 50000)
          {
            return "#4292c6";
          }
          else if (d.tot_dis < 100000)
          {
            return "#2171b5";
          }
          else if (d.tot_dis >= 1000000)
          {
            return "#084594";
          }
          else {
            //TODO: CHANGE INCREMENTS WHEN REDOING MONGO
            return "#6baed6";
          }

        } else if ( d.graphtype === "individual"){
          if (d.TRANSACTION_AMT < 500)
          {
            return "#ccece6";
          }
          else if (d.TRANSACTION_AMT < 1500)
          {
            return "#99d8c9";
          }
          else if (d.TRANSACTION_AMT < 4999)
          {
            return "#66c2a4";
          }
          else if (d.TRANSACTION_AMT < 10000)
          {
            return "#41ae76";
          }
          else if (d.TRANSACTION_AMT < 50000)
          {
            return "#238b45";
          }
          else if (d.TRANSACTION_AMT >= 50000)
          {
            return "#005824";
          }
        }
      })
      //Brewer scale colors
      //#ffffd9
      // #edf8b1
      // #c7e9b4
      // #7fcdbb
      // #41b6c4
      // #1d91c0
      // #225ea8
      // #253494
      // #081d58

    node.append("circle")
      .attr("class", "circle")
      .attr("r",function(d) {
        if ( d.graphtype === "candidate") {
          return;
        } else if ( d.graphtype === "committee" || d.graphtype === "associated"){
          return 20;
        } else {
          return 10;
        }
      })

  // svg.append("defs")
  //   .append("pattern")
  //   .attr("id", "icon-img")
  //   .attr('width', 100)
  //           .attr('height', 100)
  //           .attr('patternContentUnits', 'objectBoundingBox')
  //           .append("svg:image")
  //               .attr("xlink:xlink:href", "https://raw.githubusercontent.com/djrobinson/campaign_finance/master/candidates/P00003392.jpg") // "icon" is my image url. It comes from json too. The double xlink:xlink is a necessary hack (first "xlink:" is lost...).
  //               .attr("x", -35)
  //               .attr("y", -35)
  //               .attr("height", "700px")
  //               .attr("width", "700px")
  //       .attr("preserveAspectRatio", "xMinYMin slice");

    var candNode = svg.selectAll(".node")
      .filter(function(d) { return d.CMTE_DSGN === "P" })
      .attr("width", 70)
      .attr("height", 70)
        .append("circle")
        .attr("id", "cand-node")
        .style("fill", "url('"+absUrl+"#circles-1')")
        .attr("r", 50);

    // candNode
    //   .append("circle")
    //   .attr("class", "circle")
    //   .attr("r", 40);
      // .style("fill", "url(#bg)")

    node.append("text")
      .attr("dx", "-5rem")
      .attr("dy", "-2rem")
      .each(addText);

    function addText(d) {
      if (!d.CANDIDATE){
        var size = "1rem";
        var name = d.CANDIDATE || d.NAME || d.CMTE_NM;
        var words = name.split(' ');
        var el = d3.select(this).style("font-size", size).text(words.join(' '));
        while (this.getBBox().width >= 120) {
          var word = words.join(' ');
          var tspan = el.text(word);
          words.pop();
        }
      }
    }

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

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
      ctrl.setSelected(d);
    })

  }

}