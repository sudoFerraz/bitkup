(function() {

	'use strict';

	angular
		.module('main')
		.run(run);

	run.$inject = [];

	function run() {
		console.log('main.run')
	}

})();
