(function() {

	'use strict';

	angular
		.module('main.app')
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider) {

		$stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				controller: 'AppController',
				templateUrl: 'app/app.html',
				loginRequired: true
			});

	}

})();
