import Web3 from 'web3'
import ProofOfExistence from 'build/contracts/ProofOfExistence1.json'

class Web3Service {
  static instance

  constructor() {
    if(Web3Service.instance) return Web3Service.instance

    Web3Service.instance = this

    this.getWeb3().then(results => {
      this.web3 = results.web3
      this.provider = results.provider;
      this.selectedAccount = results.selectedAccount;
      this.networkId = results.networkId;
      this.networkName = results.networkName;
      console.log(`${results.networkName} (${results.networkId}) - ${results.selectedAccount}`)

      const contract = new this.web3.eth.Contract(
        ProofOfExistence.abi,
        ProofOfExistence['networks'][this.networkId].address
      )

      contract.methods.proofFor('teste').call(null, (r) => {
        console.log(r)
      })

    })
  }

  getWeb3() {
    return new Promise((res, rej) => {
      
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
          console.log('No web3 instance injected, using infura\'s provider');
        }
        
        const networks = {
          '1': 'Main Ethereum',
          '3': 'Ropsten',
          '4': 'Rinkeby',
          '42': 'Kovan'
        }

        const networkId = await web3js.eth.net.getId().catch(err => rej(err))
        const networkName = (networks[networkId]) ? networks[networkId] : 'Private'
        const accounts = await web3js.eth.getAccounts()
        const selectedAccount = accounts[0]

        res({ ...results, selectedAccount, networkId, networkName })
      })
    })
  }

  getCurrentProvider() {
    return this.web3.currentProvider;
  }
}

export default new Web3Service()