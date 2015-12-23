var myApp = angular.module('project', []);
myApp.controller('mainCtrl', function Main($scope, $http){
  $http.get('http://api.randomuser.me/?results=24').success(function(data) {
    $scope.users = data.results;
  }).error(function(data, status) {
    alert('get data error!');
  });
});
