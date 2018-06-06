(function() {

	'use strict';

	angular
		.module('main')
		.service('matches', matches);

	matches.$inject = ['$rootScope', '$q', '$http'];

	function matches($rootScope, $q, $http) {

		return {
			list: list 
		}
    
    async function list() {
      let def = $q.defer()

      const BetsBaseJson = (await $http.get('/build/contracts/BetsBase.json')).data
      const BetsBase = $rootScope.web3.instance.eth.contract(BetsBaseJson.abi)
      const BetsBaseInstance = BetsBase.at(BetsBaseJson.networks[$rootScope.web3.network.id].address)
      
      BetsBaseInstance.getLength.call((e, len) => {
        if(e) def.reject(e)
        else {
          let matches = []
          for(let i = 0; i < len.toNumber(); i ++) {
            BetsBaseInstance.getMatch.call(i, (e, match) => {
              if(e) def.reject(e)
              else matches[i] = match
            })
          }
          def.resolve(matches)
        }
      })

      return def.promise
    }
    
	}

})();
