(function() {

	'use strict';

	angular
		.module('main')
		.service('toast', toast);

	toast.$inject = ['ngToast'];

	function toast(ngToast) {

		return {
			success: success,
			error: error
		}

		function success(message) {

			ngToast.success({
				content: message,
				dismissButton: true
			});

		}

		function error(message) {

			ngToast.danger({
				content: message,
				dismissButton: true
			});

		}

	}

})();
