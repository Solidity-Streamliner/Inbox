const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {abi, bytecode} = require('./compile');

let provider = new HDWalletProvider({
    mnemonic: {
        phrase: "nasty eyebrow silent squeeze put edge protect song fox rigid among repair"
    },
    providerOrUrl: "https://goerli.infura.io/v3/e3b36f9afbdd46e2aaf70dacd1a00c04"
});

const web3 = new Web3(provider);