var Migrations = artifacts.require("./BetsBase.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
