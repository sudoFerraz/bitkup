import Web3 from 'web3'
// import BetsBase from 'build/contracts/BetsBase.json'

class Web3Service {

  static instance

  constructor() {
    if(!Web3Service.instance) Web3Service.instance = this
    return Web3Service.instance
  }

  load() {
    return new Promise((resolve, reject) => {
      
      let web3js
      let results = {}
      
      window.addEventListener('load', async function() {
        
        if(typeof web3 !== 'undefined') {
          const provider = (window.web3.currentProvider.isMetaMask) ? 'MetaMask' : 'Custom'
          web3js = new Web3(window.web3.currentProvider);
          results = {
            web3: new Web3(window.web3.currentProvider),
            provider
          }
        } else {
          let wsProvider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws')
          web3js = new Web3(wsProvider);
          results = {
            web3: web3js,
            provider: 'Infura'
          }
          console.warn('No web3 instance injected, using infura\'s provider');
        }
        
        const networks = {
          '1': 'Main Ethereum',
          '3': 'Ropsten',
          '4': 'Rinkeby',
          '42': 'Kovan'
        }

        const network = {}
        network.id = await web3js.eth.net.getId().catch(err => reject(err))
        network.name = (networks[network.id]) ? networks[network.id] : 'Private'
        
        const accounts = await web3js.eth.getAccounts()
        const selectedAccount = accounts[0]

        if(!selectedAccount) reject(new Error('No account selected.'))
        else {
          this.web3 = results.web3
          this.provider = results.provider
          this.network = network
          this.account = selectedAccount
          console.log(this.account)
          resolve(this)
        }
      })
    })
  }

  getCurrentProvider() {
    return this.web3.currentProvider;
  }
}

export default Web3Service