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
    const deployerAccount = accounts[0];
    console.log('Deployer account:', deployerAccount);

    // Use one of those accounts to deploy
    // the contract
    myContract = new web3.eth.Contract(abi);
    const contractDeployer = myContract.deploy({
		data: '0x' + bytecode,
		arguments: ['Hello World'],
	});
    const gas = await contractDeployer.estimateGas({from: deployerAccount});
	console.log('Estimated gas:', gas);

    tx = await contractDeployer.send({
        from: deployerAccount,
        gas,
        gasPrice: '10000000000',
    });
    myContract.options.address = tx.options.address;
    console.log('Contract deployed at address: ' + tx.options.address);

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(tx.options.address);
        console.log(myContract);
    });

    it('has a default message', async () => {
        const message = await myContract.methods.message().call();
        assert.equal(message, 'Hello World');
    });

    it('can change the message', async () => {
        await myContract.methods.setMessage('Buy Worlds').send({ from: accounts[0] });
        const newMessage = await myContract.methods.message().call();
        assert.equal(newMessage, 'Buy Worlds');
    });

    
});