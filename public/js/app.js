var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {
    $scope.newUser = {
      done : false
    };
    $scope.users = [];

    $scope.doneFilter = { done : true };
    $scope.notDoneFilter = { done : false };

    $scope.addUser = function() {
      $http.post('/user.json', $scope.newUser).success(function(data) {
        if (data.user) {
          $scope.users.push(data.user);
          $scope.newUser.username = '';
          $scope.newUser.password = '';
          $location.path('/view1');
        }
        else {
          alert(JSON.stringify(data));
        }
      });
    };

    $scope.setUsers = function(users) {
      $scope.users = users;
    };

    $scope.update = function(user) {
      $http.put('/user/' + user._id + '.json', user).success(function(data) {
        if (!data.user) {
          alert(JSON.stringify(data));
        }
      });
    };

    $scope.updateList = function() {
      $http.get('/users.json').success(function(data) {
        $scope.users = data.users;
      });
    };

    setInterval(function() {
      $scope.updateList();
      $scope.$apply();
    }, 30 * 60 * 1000); // update every 30 minutes;

    $scope.updateList();
  }
]);

myApp.controller('MyCtrl1', function () {
    $(".signupdiv").remove();
});

myApp.controller('MyCtrl2', function ($scope) {
    // write Ctrl here

});

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
