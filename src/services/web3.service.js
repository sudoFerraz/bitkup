(function() {

  'use strict';

  angular
    .module('main')
    .service('Web3Service', Web3Service)

  Web3Service.$inject = ['$rootScope', '$window']

  function Web3Service($rootScope, $window) {

    const load = () => {
      return new Promise((resolve, reject) => {
        
        let results
        let web3js

        if (typeof web3 !== 'undefined') {
          let provider = ($window.web3.currentProvider.isMetaMask) ? 'MetaMask' : 'Custom'
          
          web3js = new Web3($window.web3.currentProvider);
          results = {
            web3: web3js,
            provider
          }
          
          let networkId = web3js.version.network
          let networkName = null;
          
          switch (networkId) {
            case "1":
              networkName = 'Main Ethereum';
              break;
            case "3":
              networkName = 'Ropsten';
              break;
            case "4":
              networkName = 'Rinkeby';
              break;
            case "42":
              networkName = 'Kovan';
              break;
            default:
              networkName = 'Private';
              break;
          }

          let accounts = web3js.eth.accounts;

          if (!accounts.length) {
            $rootScope.web3 = { loaded: false }
            reject(new Error('Make sure that you have logged in into an account to continue'))
          }

          $rootScope.web3 = {
            instance: results.web3,
            provider: results.provider,
            network: {
              id: networkId,
              name: networkName
            },
            account: accounts[0],
            loaded: true
          }

          resolve($rootScope.web3);
        } else {
          $rootScope.web3 = { loaded: false }
          reject(new Error('No provider found'))
        }

      })
    }

    return { load }
  }

})()