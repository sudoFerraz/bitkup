import Web3Service from './Web3Service'

class MatchesService {

  static instance

  constructor() {
    if(!MatchesService.instance) MatchesService.instance = this
    this.web3Service = new Web3Service()
    return MatchesService.instance
  }

  async list() {
    return new Promise((resolve, reject) => {
      resolve('Matches for '+ this.web3Service.account)
    })
  }

}

export default MatchesService