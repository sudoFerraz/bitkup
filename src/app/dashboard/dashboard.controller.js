(function() {

	'use strict';

	// const BetsBase = require('./build/contracts/BetsBase.json')

	angular
		.module('main.app.dashboard')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$rootScope', '$http', 'toast', '$q'];

	function DashboardController($scope, $rootScope, $http, toast, $q) {

		$scope.matches = []

		$scope.getLength = (BetsBaseInstance) => {
			return new Promise((resolve, reject) => {
				BetsBaseInstance.getLength.call((e, len) => {
					if(e) reject(e)
					else resolve(len)
				})
			})
		}

		$scope.getMatch = (BetsBaseInstance, index) => {
			return new Promise((resolve, reject) => {
				BetsBaseInstance.getMatch.call(index, (e, m) => {
					if(e) reject(e)
					else resolve(m)
				})
			})
		}

		$scope.load = async () => {

			const BetsBaseJson = (await $http.get('/build/contracts/BetsBase.json')).data
      const BetsBase = $rootScope.web3.instance.eth.contract(BetsBaseJson.abi)
      const BetsBaseInstance = BetsBase.at(BetsBaseJson.networks[$rootScope.web3.network.id].address)
      
      const length = await $scope.getLength(BetsBaseInstance)
			$scope.matches = []
			
			for(let i = 0; i < length.toNumber(); i ++)
				$scope.matches.push(await $scope.getMatch(BetsBaseInstance, i))

			return $scope.matches
		}
		
		$scope.load().then(m => {
			$scope.$apply()
		}, e => {
			toast.error('Failed to load matches :(')
		})

	}

})();
