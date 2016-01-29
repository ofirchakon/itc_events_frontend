// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories', 'ion-google-place', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// .config(function($cordovaFacebookProvider) {
//   var appID = 123456789;
//   var version = "v2.0"; // or leave blank and default is v2.0
//   $cordovaFacebookProvider.browserInit(appID, version);
// })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/profil.html',
    controller: 'AppCtrl'
  })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
        controller: 'CreateCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/event/:eventId',
      views: {
        'menuContent': {
          templateUrl: 'templates/event.html',
          controller: 'ParticipantsCtrl'

        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/wall.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    // .state('app.playlists', {
    //   url: '/playlists',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/wall.html',
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })

    .state('app.participants', {
      url: '/participants',
      views: {
        'menuContent': {
          templateUrl: 'templates/participants.html',
          controller: 'ParticipantsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});


