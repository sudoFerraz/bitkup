(function() {

	'use strict';

	angular
		.module('main.app.dashboard')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope'];

	function DashboardController($scope) {
		console.log('u are in dashboard')
	}

})();
