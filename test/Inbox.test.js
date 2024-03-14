const assert = require('assert');
const ganache = require('ganache');
const {Web3} = require('web3');

const web3 = new Web3(ganache.provider());

const {abi, bytecode} = require('../compile');

let accounts;
let myContract;
let tx;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
    console.log('deployer account:', defaultAccount);

    // Use one of those accounts to deploy
    // the contract
    myContract = new web3.eth.Contract(abi);
    myContract.handleRevert = true;
    const contractDeployer = myContract.deploy({
		data: '0x' + bytecode,
		arguments: ['Hello World'],
	});
    const gas = await contractDeployer.estimateGas({
		from: defaultAccount,
	});
	console.log('estimated gas:', gas);
    tx = await contractDeployer.send({
        from: defaultAccount,
        gas,
        gasPrice: 10000000000,
    });
    console.log('Contract deployed at address: ' + tx.options.address);

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(tx.options.address);
        console.log(myContract);
    });
});