const HDWalletProvider = require("@truffle/hdwallet-provider");
const {Web3} = require("web3");
const {abi, bytecode} = require('./compile');

let provider = new HDWalletProvider({
    mnemonic: {
        phrase: "nasty eyebrow silent squeeze put edge protect song fox rigid among repair"
    },
    providerOrUrl: "https://sepolia.infura.io/v3/e3b36f9afbdd46e2aaf70dacd1a00c04" //https://goerli.infura.io/v3/e3b36f9afbdd46e2aaf70dacd1a00c04"
});

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const deployerAccount = accounts[0];
    console.log('Deployer account:', deployerAccount);

    const myContract = new web3.eth.Contract(abi);
    const contractDeployer = myContract.deploy({
        data: '0x' + bytecode,
        arguments: ['Hello World'],
    });
    const gas = await contractDeployer.estimateGas({from: deployerAccount});
    console.log('Estimated gas:', gas);

    const tx = await contractDeployer.send({
        from: deployerAccount,
        gas,
        gasPrice: '10000000000',
    });
    myContract.options.address = tx.options.address;
    console.log('Contract deployed at address: ' + tx.options.address);
}

deploy();