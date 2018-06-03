(function() {

	'use strict';

	angular
		.module('main.app')
		.controller('AppController', AppController);

	AppController.$inject = [];

	function AppController() {
		console.log('app')
	}

})();
