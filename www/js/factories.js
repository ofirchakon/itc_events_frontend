angular.module('starter.factories', [])

.factory('User', ['$http', function($http){
	var obj = {};

	obj.getAll = function(){
		return $http({
			method: 'GET',
			url: 'http://meetc.herokuapp.com:80/get_users',
		});
	}

	obj.getById = function (user_id) {
		return $http({
			method: 'POST',
			url: 'http://meetc.herokuapp.com:80/user/get',
			data: { 'user_id': user_id }
		});
	}

	obj.getByEvent = function (event_id) {
		return $http({
			method: 'POST',
			url: 'http://meetc.herokuapp.com:80/event_users',
			data: { 'event_id': event_id }
		});
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

		return $http.post('http://meetc.herokuapp.com:80/create_user', user);
	}
	return obj;
}])

.factory('Event', ['$http', function ($http) {

	var obj = {};

	obj.create = function(event_data) {
		var _event = {
			'event_id': event_data.id,
			'user_id': event_data.user_id,
			'title': event_data.title,
			'at_time': event_data.at_time,
			'lat': event_data.lat,
			'lng': event_data.lng,
			'picture_url': event_data.picture_url,
			'participants': event_data.participants
		};

		return $http.post('http://meetc.herokuapp.com:80/create_event', _event);
	};

	obj.getAll = function () {
		return $http({
			method: 'GET',
			url: 'http://meetc.herokuapp.com:80/get_events'
		});
	};

	obj.update = function (update_obj) {
		return $http({
			method: 'POST',
			url: 'http://meetc.herokuapp.com:80/update_event',
			data: {
				'event_id': update_obj.event_id,
				'user_id': update_obj.user_id,
				'new_status': update_obj.new_status
			}
		});
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