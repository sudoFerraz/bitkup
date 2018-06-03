(function() {

	'use strict';

	angular
		.module('main.app.dashboard')
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider) {

		$stateProvider
			.state('app.dashboard', {
				url: '/dashboard',
				controller: 'DashboardController',
				templateUrl: 'app/dashboard/dashboard.html',
				loginRequired: true
			});

	}

})();
