angular
  .module('campaignApp')
  .factory('apiExpoService', apiExpoService);

apiExpoService.$inject = ['$http'];


function apiExpoService($http) {
  return {
    getCandMstr: getCandMstr,
    getOpex: getOpex,
    getCmteCand: getCmteCand,
    getVotes: getVotes,
    getIndExp: getIndExp,
    getCmtes: getCmtes,
    getDisb: getDisb,
    getTransfers: getTransfers,
    getIndiv: getIndiv
  };

  function getCandMstr() {
    return $http.get('/api/candidates')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      console.log(response);
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for candmstr.' + error.data);
    }
  }

  function getOpex() {
    return $http.get('/api/opex')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for opex.' + error.data);
    }
  }

  function getCmteCand() {
    return $http.get('/api/contributions')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for opex.' + error.data);
    }
  }

  function getVotes() {
    return $http.get('/api/votes')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for votes.' + error.data);
    }
  }

  function getIndExp() {
    return $http.get('/api/pac')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for indexp.' + error.data);
    }
  }

  function getCmtes() {
    return $http.get('/api/committees')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for indexp.' + error.data);
    }
  }

  function getDisb() {
    return $http.get('/api/disbursements')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for indexp.' + error.data);
    }
  }

  function getTransfers() {
    return $http.get('/api/transfers')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for indexp.' + error.data);
    }
  }

  function getIndiv() {
    return $http.get('/api/individuals')
      .then(getCompletedRes)
      .catch(getFailedRes);
    function getCompletedRes(response) {
      return response.data;
    }
    function getFailedRes(error) {
      console.log('XHR Failed for indexp.' + error.data);
    }
  }
}