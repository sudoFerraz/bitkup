var Migrations = artifacts.require("./BetsBase.sol");
var POE = artifacts.require("./ProofOfExistence1.sol");


module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(POE);
};
