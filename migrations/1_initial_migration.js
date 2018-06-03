var Migrations = artifacts.require("./BetsBase.sol");

var core = artifacts.require("./BetsCore.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);

  deployer.deploy(core)
};
