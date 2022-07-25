const Cashier = artifacts.require("cashier.sol");

module.exports = function (deployer) {
  deployer.deploy(Cashier);
};