angular.module('starter.factories', [])

.factory('User', ['$http', function($http){
	var obj = {};

	obj.getAll = function(){
		return [{
			name: 'Raphael Fettaya',
			id: 1
		}, 
		{
			name: 'Harry Potter',
			id: 2
		}, ]
	}

	obj.create = function(user_data){
		//FORMATING
		var dict_gen = {'male': 0, 'female': 1};
		var user = {'facebook_id': user_data.id,
					'name': user_data.name,
					'gender': dict_gen[user_data.gender],
					'email': user_data.email,
					'picture_url': user_data.picture_url
		};

		return $http.post('http://ofirchakon.com/meetc/public/create_user.php', user);
	}
	return obj;
}])

.factory('FB', ['$http', '$q', function($http, $q){
  var obj = {};
  var FACEBOOK_APP_ID = 440381212825824;

  obj.login = function(callback){
  	 if (!window.cordova) {
      //this is for browser only
      facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
    }
	var fbLoginSuccess = function (authData) {
        var fb_access_token = authData.authResponse.accessToken;
        obj.getFacebookProfileInfo(fb_access_token).then(function(data){
        	var user = data;
        	user.picture_url = "http://graph.facebook.com/"+user.id+"/picture?width=400&height=400";
        	callback(user);
        });
	}

	  obj.getFacebookProfileInfo = function (token) {
	    var info = $q.defer();
	    $http({
	      method: 'GET',
	      url: 'https://graph.facebook.com/me?access_token='+token+'&fields=id,name,email,gender'
	    }).then(function successCallback(response) {
	      info.resolve(response.data);
	    }, function errorCallback(response) {
	      info.reject(response);
	    });
	    // facebookConnectPlugin.api('/me?access_token='+token+'&fields=id,name,first_name,last_name,email,birthday', ['email','public_profile','user_friends'],
	    //   function (response) {
	    //     console.log(response);
	    //     info.resolve(response);
	    //   },
	    //   function (response) {
	    //     console.log(response);
	    //     info.reject(response);
	    //   });
		return info.promise;
		}

	facebookConnectPlugin.login(['email','public_profile'], fbLoginSuccess,
	  function loginError (error) {
	    console.error(error)
	  }
	);
   }

	return obj;
}])