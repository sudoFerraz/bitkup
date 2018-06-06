(function() {

	'use strict';

	angular
		.module('main')
		.run(run);

	run.$inject = ['Web3Service'];

	function run(Web3Service) {
		Web3Service.load()
	}

})();
