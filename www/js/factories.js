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
	return obj;
}])