(function() {

	'use strict';

	angular
		.module('main.app.dashboard')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope'];

	function DashboardController($scope) {

		$scope.loadBetsPromise = new Promise((resolve, reject) => {
			setTimeout(function () {
				console.log('resolve')
				resolve({})
			}, 2000)
		})

	}

})();
