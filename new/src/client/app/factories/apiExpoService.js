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
    getIndExp: getIndExp
  };

  function getCandMstr() {
    return $http.get('/api/candmstr/candsumm')
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
    return $http.get('/api/cmtecand')
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
    return $http.get('/api/indexp')
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