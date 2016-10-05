import {Component, OnInit, Output, EventEmitter, ViewChild} from 'angular2/core';
import {GraphService} from '../api_services/graph.service';
import {CandidateTableComponent} from '../candidate/candidate-table.component';
import {MiniProfileComponent} from './mini-profile/mini-profile.component.ts';
import {IndividualPopupComponent} from './individual-popup/individual-popup.component.ts';
import {CommitteePopupComponent} from './committee-popup/committee-popup.component.ts';
import {CandidatePopupComponent} from './candidate-popup/candidate-popup.component.ts';
import {TreemapComponent} from './charts/treemap/treemap.component.ts';
import {BubbleComponent} from './charts/bubble-chart.component';
import {BarComponent} from './charts/bar-chart.component';
import {SpinnerComponent} from '../loading/spinner.component';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import {Router, RouteParams} from 'angular2/router';
import {LocationStrategy} from  'angular2/router'

@Component({
  selector: 'graph-view',
  templateUrl: 'app/graphs/graph.html',
  styleUrls: ['app/graphs/graph.css'],
  providers: [GraphService],
  directives: [CandidateTableComponent, MiniProfileComponent, IndividualPopupComponent, CommitteePopupComponent, CandidatePopupComponent, TreemapComponent, BubbleComponent, BarComponent, SpinnerComponent]
})
export class GraphComponent implements OnInit  {
  public selectedNode: Object;
  public candidate: Object;
  public candidate_id: string;
  public indivPopup: boolean;
  public cmtePopup: boolean;
  public individualTran: string;
  public indivName: string;
  public selectedCommittee: string;
  public result: Object;
  public nodeData = Array;
  public linkData = Array;
  public graph: boolean;
  public fullRoute: string = "";
  public fullTreemap: boolean;
  public fullBubble: boolean;
  public isRequesting: boolean;
  public bubbleCmte: string;
  public bioguideId: string;
  public selectedCandidate: string;
  public isCand: boolean;
  public absUrl: string;
  public candImage: string;
  public size: string = 'small';
  public isPres: boolean;
  public isFirst: boolean;
  public isDark: string;
  public isShown: string;
  public popster: boolean = false;
  public isSuperpac: boolean;
  @ViewChild(MiniProfileComponent) miniProfileComponent: MiniProfileComponent;

  constructor(
    private _params: RouteParams,
    private _graphService: GraphService,
    private http: Http,
    private location: LocationStrategy
    ) {
    this.graph = true;
    this.candidate_id = _params.get('id');
    this.candImage = "https://s3-us-west-2.amazonaws.com/campaign-finance-app/"+this.candidate_id+".jpg";
  }

  ngOnInit() {
    this.isShown = "block";
    this.isDark = 'rgba(255, 255, 255, .5)';
    this.isFirst = true;
    if (this.candidate_id[0] === 'H' || this.candidate_id[0] === 'S'){
      this.getHouseGraphData(this.candidate_id, this.size);
      this.isSuperpac = false;
      this.isPres = false;
    } else if (this.candidate_id[0] === 'P') {
      this.getGraphData(this.candidate_id, this.size);
      this.isSuperpac = false;
      this.isPres = true;
    } else if (this.candidate_id[0] === 'C') {
      this.getSuperPacsGraphData(this.candidate_id, this.size);
      this.isPres = false;
      this.isSuperpac = true;
    }
    this.absUrl = this.location.path();
    // setTimeout(this.closeInstructions.bind(this), 3000);
  }


  lightUpPage() {
    this.isDark = 'none';
    setTimeout(function(){this.isShown = 'none';}.bind(this), 1000);
  }

  closeInstructions(){
    this.isFirst = false;
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
  }

  exitIndiv(){
    this.indivPopup = false;
  }

  public changeSize(){
    if (this.size === 'small') {
      d3.select("#force").selectAll("*").remove();
      this.size = 'big';
      this.getGraphData(this.candidate_id, 'big');
    } else {
      d3.select("#force").selectAll("*").remove();
      this.size = 'small';
      this.getGraphData(this.candidate_id, 'small');
    }

  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  public getGraphData(candId, size): void {
    Observable.forkJoin(
      this.http.get('/api/candidates/' + candId).map((res: Response) => res.json()),
      this.http.get('/api/legislators/' + candId).map((res: Response) => res.json()),
      // this.http.get('api/graph/test/' + candId + '/' + size).map((res: Response) => res.json())
      this.http.get('/api/graph/test/' + candId +'/' + size).map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log("Graph Data: ", data);
        this.candidate = data[0];
        this.bioguideId = data[1];
        this.graphInit(data[2]);
      },
      err => console.error(err)
    )
  }


 public getHouseGraphData(candId, size): void {
   console.log("Mehe?", candId, size);
    Observable.forkJoin(
      this.http.get('/api/candidates/' + candId).map((res: Response) => res.json()),
      this.http.get('/api/legislators/' + candId).map((res: Response) => res.json()),
      this.http.get('/api/graph/congress/' + candId + '/small').map((res: Response) => res.json())
    ).subscribe(
      data => {
        console.log("House data.");
        console.log("House data: ", data);
        this.candidate = data[0];
        this.graphInit(data[2]);
      },
      err => console.error(err)
    )
  }

  public getSuperPacsGraphData(cmte_id, size): void {
    Observable.forkJoin(
      this.http.get('api/graph/superpac/'+cmte_id+'/small').map((res: Response) => res.json()),
      this.http.get('/api/committees/' + cmte_id).map((res: Response) => res.json())
    ).subscribe(
      data => {

        this.candidate = data[1];
        this.graphInit(data[0]);
      },
      err => console.error(err)
    )
  }

  //This function is bananas. Should probably be broken into 70 files
  public graphInit(result){
        console.log("Result!: ", result);
        //ONly for mongo
        result = result.data;
        this.result = result;
        var nonCand = result.filter((elem) => {
          return (elem.CMTE_DSGN !== 'P' && elem.CMTE_TP !== 'O');
        });

        var candArr = result.filter((elem)=>{
          return (elem.CMTE_DSGN === 'P' || elem.CMTE_TP === 'P' && !this.isSuperpac || elem.CMTE_TP === 'O' && this.isSuperpac);
        });
        console.log("candArr", candArr);
        candArr[0].CANDIDATE = this.candidate_id;
        candArr[0].CAND_ID = this.candidate_id;
        candArr[0].data = {};
        candArr[0].data = this.candidate[0];
        var resultOrdered = candArr.concat(nonCand);
        this.nodeData = resultOrdered.map((elem, i)=>{
          //Wil likely need to set a similar property on api call to find superpacs
          if (elem.CAND_ID){
            elem.CORE = true;
            elem.NODE = i;
          }

          if (elem.CMTE_ID === this.candidate_id || elem.OTHER_ID === this.candidate_id){
            elem.CORE = true;
            elem.NODE = i;
          }

          if (elem.CMTE_TP === 'O'){
            elem.CORE = true;
            elem.NODE = 0;
          } else {
            elem.NODE = i;
          }
          console.log("elem after: ", elem);
          return elem;
        });
        console.log("Node data: ", this.nodeData);
        var nodeData = this.nodeData;
        this.linkData = nodeData.reduce((prev, elem)=>{
          if (elem.CAND_ID || elem.CORE){
            prev.push({ "source": elem.NODE, "target": 0, "value": 1 })
              return prev;
          } else if (elem.OTHER_ID) {
            nodeData.forEach((el, i) => {
              if ((el.CORE && el.CMTE_ID === elem.CMTE_ID && el.graphtype !== 'individual') || (elem.CMTE_ID === el.OTHER_ID && el.graphtype === 'superpac')){
                prev.push({ "source": elem.NODE, "target": i, "value": 2 })
                return prev;
              } else if (elem.CMTE_ID === el.OTHER_ID && elem.graphtype !== 'individual'){
                return prev;
              } else if (el.CMTE_ID === elem.OTHER_ID && el.graphtype === 'committee'){
                prev.push({ "source": elem.NODE, "target": i, "value": 3 })
                return prev;
              }
            })
            return prev;
          } else {
            nodeData.forEach((el, i) => {
              if (el.OTHER_ID === elem.CMTE_ID || el.CAND_ID && el.CMTE_ID === elem.CMTE_ID){
                prev.push({ "source": elem.NODE, "target": i, "value": 4 })
                return prev;
              }
            })
            return prev;
          }
        }, [])
        this.buildGraph(this, this.candidate_id, this.absUrl);
  }

  public onHover(d){
    this.miniProfileComponent.updateMiniProfile(d);
  }


  showFlow() {

    d3.selectAll('.link')
    .filter(function(d){
      return d.value === 3;
    })
    .style("stroke-width", "4px")
    .style("stroke", "aqua")
    .style("stroke-dasharray", '100')
    .style("animation", "dash 10s linear backwards")

    d3.selectAll('.link')
    .filter(function(d){
      return d.value !== 3;
    })
    .style("stroke-width", "4px")
    .style("stroke", "aqua")
    .style("stroke-dasharray", '100')
    .style("animation", "dash 10s linear backwards")
    .style("animation-direction", "reverse")
  }

  hideFlow(){
      d3.selectAll('.link')
        .style("stroke-width", "4px")
        .style("stroke", "#DCDCDC")
        .style("stroke-dasharray", 'none')
        .style("animation", "none")
        .style("animation-direction", "none")
  }
  showMoreButton(){
    d3.selectAll('.test-button')
      .style('background','aqua')
  }
  hideMoreButton(){
    d3.selectAll('.test-button')
      .style('background','white')
  }
  showPreview(){
    d3.selectAll('mini-profile-view *')
      .style('border', 'none')
    d3.selectAll('mini-profile-view')
      .style('box-sizing', 'border-box')
      .style('border', 'solid 20px aqua')

  }
  hidePreview(){
    d3.selectAll('mini-profile-view')
      .style('box-sizing', 'border-box')
      .style('border', 'none')
    d3.selectAll('mini-profile-view')
      .style('border', "solid 3px #4d4d4d")
  }
  showExamplePopup(){

    d3.selectAll('.candidate')
      .each(function(d){
        this.candPopup = true;
        this.isCand = true;
        this.popster = true;
        this.selectedNode = false;
        this.selectedCandidate = d.CAND_ID;
        this.selectedCommittee = d.OTHER_ID || d.CMTE_ID;
      }.bind(this))
  };

  hideExamplePopup(){
    this.candPopup = false;
    this.isCand = false;
    this.popster = false;
  }

  selectSizes() {
    d3.selectAll('.instructions-1')
      .style('background', 'aqua')
  }

  deselectSizes(){
    d3.selectAll('.instructions-1')
            .style('background', 'white')
            .style('border-left', 'solid 3px #4d4d4d')
  }


  selectCategory() {
    d3.selectAll('.instructions-2')
      .style('box-sizing', 'border-box')
      .style('background', 'aqua')
    d3.selectAll('.committee')
        .style('stroke', 'aqua')
        .style('stroke-width', '6px')
    d3.selectAll('text').style({ 'stroke-width': '1px'});
  }

  deselectCategory() {
    d3.selectAll('.instructions-2')
      .style('background', 'white')
      .style('border-left', 'solid 3px #4d4d4d')
    d3.selectAll('.committee')
    .style('stroke', '0')
    .style('stroke-width', '0')

  }

  selectTypes() {
    d3.selectAll('.individual')
        .style('stroke', 'aqua')
        .style('stroke-width', '6px')
     d3.selectAll('text').style({ 'stroke-width': '1px'});
  }

  deselectTypes() {
    d3.selectAll('.individual')
          .style('stroke', '0')
          .style('stroke-width', '0')
  }

  setSelected(selected:string) {
    this.selectedNode = selected;
  }

  buildGraph(ctrl, candId, absUrl) {
    d3.selectAll("#force > *").remove();
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

    function clicked(d, i) {
      if (d3.event.defaultPrevented) return; // dragged

      ctrl.setSelected(d);
      if (d.graphtype === 'individual'){
        ctrl.indivName = d.NAME;
        ctrl.indivPopup = true;
        ctrl.individualTran = d.TRAN_ID;
        ctrl.selectedNode = false;
      } else {
        ctrl.candPopup = true;
        ctrl.isCand = true;
        ctrl.selectedNode = false;
        ctrl.selectedCandidate = d.CAND_ID;
        ctrl.selectedCommittee = d.OTHER_ID || d.CMTE_ID;
      }
    }

    var height = 900;
    var width = 1600;

    //BEHAVIOR SETUP FOR FORCE GRAPH. USES HELPER FUNCTIONS BELOW
    var zoom = d3.behavior.zoom()
      .scaleExtent([0, 100])
      .on("zoom", zoomed);

    var drag = d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function(d) {

        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
        force.start();
      })
      .on("drag", dragged)
      .on("dragend", dragended)
      ;


    //SETS UP AREA OF THE FORCE LAYOUT
    d3.select("candidate-table").remove();
    var svg = d3.select("#force")
      .append("g") //< added
      .call(zoom);

    var rect = svg.append("rect") //<= Added
      .attr("width", "100vw")
      .attr("height", "100vh")
      .style("fill", "none")
      .style('border', 'solid 10px orange')
      .style("pointer-events", "all");

    var container = svg.append("g");
    //TODO: Make a conditional for congressman

    function imageExists(url, callback) {
      var img = new Image();
      img.onload = function() { callback(true); };
      img.onerror = function() { callback(false); };
      img.src = url;
    }



    svg.append('defs')
        .append('pattern')
            .attr('id', 'circles-1')
            .attr('width', 1)
            .attr('height', 1)
            .append("svg:image")
                .attr("xlink:xlink:href", function(d) {
                // return "https://s3-us-west-2.amazonaws.com/campaign-finance-app/"+candId+".jpg"; // "icon" is my image url. It comes from json too. The double xlink:xlink is a necessary hack (first "xlink:" is lost...).
                var candArr = ['P00003392'
                ,'P20002671'
                ,'P20002721'
                ,'P40003576'
                ,'P60003670'
                ,'P60005915'
                ,'P60006046'
                ,'P60006111'
                ,'P60006723'
                ,'P60007168'
                ,'P60007242'
                ,'P60007671'
                ,'P60007697'
                ,'P60008059'
                ,'P60008398'
                ,'P60008521'
                ,'P80001571'
                ,'P80003478']
                  if (candArr.indexOf(candId) !== -1){
                    return 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + candId+'.jpg';
                  } else {
                    return 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/placeholder.png';
                  }

                  // var profile_img;
                  // var imageUrl = 'https://s3-us-west-2.amazonaws.com/campaign-finance-app/' + candId+ '.jpg';
                  // return imageExists(imageUrl, function(exists) {
                  //   if (exists) {
                  //     console.log(imageUrl);
                  //     profile_img = imageUrl;
                  //     return profile_img;
                  //   } else {
                  //     profile_img = 'http://www.purplestrategies.com/wp-content/uploads/2014/04/placeholder_male@2x.png';
                  //     return profile_img;
                  //   }
                  // });

                })
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 120)
                .attr("width", 120)

    //STARTS FORCE LAYOUT. ADDS DATA, CREATES LINKS AND NODES
    if (this.nodeData.length < 15){
      var force = d3.layout.force()
      .gravity(.3)
      .friction(.7)
      .size([1600, 900])
      .nodes(this.nodeData)
      .links(this.linkData)
      .distance(220)
      .charge(-1000)
      .start();
    } else {
      var force = d3.layout.force()
      .gravity(.01)
      .friction(.7)
      .size([width, height])
      .nodes(this.nodeData)
      .links(this.linkData)
      .distance(220)
      .charge(-1000)
      .start();
    }


    svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
      .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 30 30")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("orient", "auto")
      .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    var link = container.append("g")
      .selectAll(".link")
      .data(this.linkData)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke-width", 3)
      .style("stroke", "#DCDCDC")
      .attr("marker-end", "url(#end)");

    var node = container.append("g")
      .selectAll(".node")
      .data(this.nodeData)
      .enter().append("g")
      .attr("class", function(d){ return d.graphtype + " node" })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.x; })
      .call(drag)
      .style("fill", function(d){
        if ( d.graphtype === "candidate" ){
          return "none";
        } else if ( d.graphtype === "committee" || d.graphtype === "associated"){
          d.tot_dis = +d.tot_dis;
          if (+d.tot_dis < 10000)
          {
            return "#F6F5AE";
          }
          else if (+d.tot_dis < 50000)
          {
            return "#F5C396";
          }
          else if (+d.tot_dis < 100000)
          {
            return "#EB9486";
          }
          else if (+d.tot_dis > 500000)
          {
            return "#DB7F67";
          } else if (d.tot_dis  > 1000000){
            return '#DB504A'
          } else {
            return "#F6F5AE"
          }

        } else if ( d.graphtype === "individual"){
          return "#35978F"
        } else if ( d.graphtype === "superpac"){
          return "maroon";
        }
      })

    node.append("circle")
      .attr("class", "circle")
      .attr("r",function(d) {
        if (d.graphtype === "superpac"){
          return 40;
        }
        if (d.TRANSACTION_AMT < 2699)
          {
            return 15;
          }
          else if (d.TRANSACTION_AMT < 4999)
          {
            return 20;
          }
          else if (d.TRANSACTION_AMT < 9999)
          {
            return 25;
          }
          else if (d.TRANSACTION_AMT < 50000)
          {
            return 30;
          }
          else if (d.TRANSACTION_AMT < 300000)
          {
            return 35;
          }
          else if (d.TRANSACTION_AMT >= 300000)
          {
            return 40;
          } else {
            return 15;
          }

      })

    var candNode = svg.selectAll(".node")
      .filter(function(d) { return (d.CMTE_TP === "P" || d.CMTE_DSGN === "P") })
      .attr("width", 100)
      .attr("height", 100)
        .append("circle")
        .attr("id", "cand-node")
        .style("fill", "url('"+absUrl+"#circles-1')")
        .attr("r", 60);

    node.append("text")
      .each(addText)



    function addText(d) {
        var size = "1rem";
        var name = d.NAME || d.CMTE_NM;
        console.log("anMalkasdlk", name);
        if (!!name){
           var words = name.split(' ');
         } else {
           words = [];
         }

        var el = d3.select(this).style("font-size", size).text(words.join(' '))
                        .style('stroke', '#4d4d4d')
                        .style('fill', '#4d4d4d')
                        .style('font-family', 'Oswald')
                        .style('font-weight', '300')
                        .style('font-size', '1.5rem')
                        .attr("dx", "-" + this.getBBox().width / 2)
                        .attr("dy", "-3rem");
        while (this.getBBox().width >= 200) {
          var word = words.join(' ');
          var tspan = el.text(word)
                        .style('stroke', '#4d4d4d')
                        .style('fill', '#4d4d4d')
                        .style('font-family', 'Oswald')
                        .style('font-weight', '300')
                        .style('font-size', '1.5rem')
                        .attr("dx", "-100")
                        .attr("dy", "-3rem");
          words.pop();
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

    node.on("click", clicked);

    node.on("mouseover", function(d) {

      console.log(d);
      ctrl.onHover(d);
      node.classed("node-active", function(o) {
      });

      link.classed("link-active", function(o) {
        return o.source === d || o.target === d ? true : false;
      });

      d3.select(this).style('fill-opacity', '.5');
      d3.select(this).classed("node-active", true);
      d3.select(this).select("circle").transition()
        .duration(750)
    })

    .on("mouseout", function(d) {
      d3.select(this).style('fill-opacity', '1');
      node.classed("node-active", false);
      link.classed("link-active", false);

      d3.select(this).select("circle").transition()
        .duration(750);
    })

  }

}