(function(){
  'use strict';

  angular
    .module('campaignApp')
    .controller('ApiExpoCtrl', ApiExpoCtrl);

    ApiExpoCtrl.$inject = ['apiExpoService'];

  function ApiExpoCtrl(apiExpoService){
    var docvm = this;

    function getCands() {
      return apiExpoService.getCandMstr()
      .then(function(data) {
        docvm.cand = data;
        return docvm.cand;
      });
    }
    getCands();

    function getOpex() {
      return apiExpoService.getOpex()
      .then(function(data) {
        docvm.opex = data;
        return docvm.opex;
      });
    }
    getOpex();

    function getCmteCand() {
      return apiExpoService.getCmteCand()
      .then(function(data) {
        docvm.cmtecand = data;
        return docvm.cmtecand;
      });
    }
    getCmteCand();

    function getVotes() {
      return apiExpoService.getVotes()
      .then(function(data) {
        docvm.votes = data;
        return docvm.votes;
      });
    }
    getVotes();

    function getIndExp() {
      return apiExpoService.getIndExp()
      .then(function(data) {
        docvm.indexp = data;
        return docvm.indexp;
      });
    }
    getIndExp();

    function getCmtes(){
      return apiExpoService.getCmtes()
      .then(function(data) {
        docvm.cmtes = data;
        return docvm.cmtes;
      });
    }
    getCmtes();

    function getDisb(){
      return apiExpoService.getDisb()
      .then(function(data) {
        docvm.disb = data;
        return docvm.disb;
      });
    }
    getDisb();

    function getTransfers(){
      return apiExpoService.getTransfers()
      .then(function(data) {
        docvm.trans = data;
        return docvm.trans;
      });
    }
    getTransfers();

    function getIndiv(){
      return apiExpoService.getIndiv()
      .then(function(data) {
        docvm.indiv = data;
        return docvm.indiv;
      });
    }
    getIndiv();
  }
})();