const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

// Compile the Solidity code using solc
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

// Get the bytecode from the compiled contract
const bytecode = compiledCode.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

const abi = compiledCode.contracts['Inbox.sol']['Inbox'].abi;

module.exports = { abi, bytecode };

// Log the Contract ABI to the console
console.log('Contract ABI:\n', abi);
//console.log(output.contracts['Inbox.sol']['Inbox']);

// `output` here contains the JSON output as specified in the documentation
/*for (var contractName in output.contracts['Inbox.sol']) {
    console.log(
      contractName +
        ': ' +
        output.contracts['Inbox.sol'][contractName].evm.bytecode.object
    );
}*/