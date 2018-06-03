(function() {

	'use strict';

	angular
		.module('main')
		.config(config);

	config.$inject = ['$urlRouterProvider'];

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/app/dashboard');
	}

})();
