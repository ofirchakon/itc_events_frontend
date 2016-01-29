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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Drink some beer', location: 'Tel Aviv', creator: 'Ofir', picture_url: 'cover.jpg', id: 1 },
    { title: 'Go bar-hopping', location: 'Tel Aviv', creator: 'Raphael', picture_url: 'cover.jpg', id: 2 },
    { title: 'Get some sushi', location: 'Tel Aviv', creator: 'Raphael',  picture_url: 'cover.jpg', id: 3 },
    { title: 'Clubbing baby seals', location: 'Tel Aviv', creator: 'Alisa',  picture_url: 'cover.jpg', id: 4 },
    { title: 'Playing video games', location: 'Tel Aviv', creator: 'Shy', picture_url: 'cover.jpg', id: 5 },
    { title: 'Whiskey shots at Cofixxx and more', location: 'Tel Aviv', creator: 'Ary', picture_url: 'cover.jpg', id: 6 }
  ];
})

.controller('ParticipantsCtrl', function($scope){
    $scope.users = [
    { name: 'Barbara Vitoria', gender: 1, picture_url: 'img/participant.jpg' },
    { name: 'Eva Lidoni', gender: 1, picture_url: 'img/participant2.jpg' },
    { name: 'Raphael Fettaya', gender: 0, picture_url: 'img/participant3.jpg' },
    { name: 'More Ladies', gender: 1, picture_url: 'img/participant4.jpg' }
    ];

    $scope.females = 0;
    $scope.males = 0;

    $scope.users.forEach(function(val){
      if (val.gender) {
        val.gender='Female';
        $scope.females++;
      }
        else{val.gender='Male';
        $scope.males++;
}
    });
    $scope.number = $scope.users.length;
    $scope.ratiof = $scope.females / $scope.number * 100;
    $scope.ratiom = $scope.males / $scope.number * 100;

})

.controller('CreateCtrl', function($scope, User){
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
    }

})
.controller('LoginCtrl', function($scope, FB, User) {
  $scope.facebookConnect = function(){
    FB.login(function(user){
      User.create(user).success(function(data){
        console.log(data);
      });
    });
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
