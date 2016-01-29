angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http) {
  var xxx = 'Whiskey shots at Cofixxx and more';
  $scope.playlists = [
    { title: 'Drink some beer', location: 'Tel Aviv', creator: 'Ofir', picture_url: 'cover.jpg', id: 1 },
    { title: 'Go bar-hopping', location: 'Tel Aviv', creator: 'Raphael', picture_url: 'cover.jpg', id: 2 },
    { title: 'Get some sushi', location: 'Tel Aviv', creator: 'Raphael',  picture_url: 'cover.jpg', id: 3 },
    { title: 'Clubbing baby seals', location: 'Tel Aviv', creator: 'Alisa',  picture_url: 'cover.jpg', id: 4 },
    { title: 'Playing video games', location: 'Tel Aviv', creator: 'Shy', picture_url: 'cover.jpg', id: 5 },
    { title: xxx, location: 'Tel Aviv', creator: 'Ary', picture_url: 'cover.jpg', id: 6 }
  ];
  $http.post('http://ofirchakon.com/meetc/public/get_events.php',
    null)
    .success(function (data) {
      console.log($scope.playlists);
      $scope.playlists = data;
      console.log($scope.playlists);
    }).error(function (err) {
      console.log('ERROR: problem with post "get_events.php": ' + err);
    }
  );
})
.controller('CreateCtrl', function($scope, User, $http){
    $scope.event_ = {
      invited : [],
      date : new Date()
    };

    var users = User.getAll();
    $scope.liste = '';

    $scope.show_users = function(){
      if($scope.event_.search_user.length > 0){
        $scope.users = users;
      }
      else{
        $scope.users = [];
      }
    }
    $scope.add_user = function(id, name){
      if($scope.event_.invited.indexOf(id) == -1){
        $scope.event_.invited.push(id);
        $scope.liste += name[0]+','
      }
      else{
        index = $scope.event_.invited.indexOf(id);
        $scope.event_.invited.splice(index, 1);
        $scope.liste = $scope.liste.substring(0, index*2 - 1) + $scope.liste.substring(Math.min(index*2 + 2,$scope.liste.length), $scope.liste.length);
      }
    }

    $scope.status_invit = 0;
    $scope.invite_all = function(){
      if($scope.status_invit == 0){
        $scope.status_invit = 1;
        $scope.event_.invited = _.pluck(users, 'id');
      }
      else{
        $scope.status_invit = 0;
        $scope.event_.invited = [];
        $scope.liste = "";
      }
      $scope.users = [];
      $scope.event_.search_user = "";
      $scope.liste = '';
      var date = formatDate($scope.event_.date);
      console.log(date);
      console.log(formatStreetView($scope.event_.place.geometry.location.lng(),$scope.event_.place.geometry.location.lat()));
    }

    function formatDate(date) {
      d = new Date(date);
      str = '';
      str += d.getFullYear() + '-';
      str += (d.getMonth() + 1) + '-';
      str += d.getDate() + ' ';
      str += d.getHours() + ':';
      str += d.getMinutes() + ':';
      str += d.getSeconds();
      return str;
    }

    function formatStreetView(lat, lng) {
      var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
      url += lat + ',' + lng;
      url += '&heading=151.78&pitch=-0.76&key=AIzaSyDyLER_E21MA0eGFF3IBIERqPKaz9heeVQ';
      return url;

    }
    
    $scope.submitEvent = function () {
      var newEvent = {};
      newEvent.title = $scope.event_.title;
      newEvent.lat = $scope.event_.place.geometry.location.lat()
      newEvent.lng = $scope.event_.place.geometry.location.lng()
      newEvent.participants = $scope.event_.invited; // Make sure creator ID is included
      newEvent.at_time = formatDate($scope.event_.date);
      // newEvent.picture_url = formatStreetView(newEvent.lat, newEvent.lng);

      $http.post('http://ofirchakon.com/meetc/public/create_event.php', newEvent);
    }

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});