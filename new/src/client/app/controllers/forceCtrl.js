angular.module('campaignApp')
   .controller('forceCtrl', function($scope, $http){
      $scope.nodeData = [{"name":"Myriel","group":1},
                         {"name":"Napoleon","group":1}];
      $scope.linkData = [{"source":1,"target":0,"value":1},
                         {"source":1,"target":0,"value":1}];
});