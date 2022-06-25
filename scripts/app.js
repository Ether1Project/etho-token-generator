var web3,
    provider,
    isMainNetwork,
    isRopsten,
    isRinkeby,
    isGoerli,
    isMetaMaskLocked,
    address;

var abi = [{"inputs":[{"internalType":"uint256","name":"totalsupply_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ercowner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

var bytecode = '60806040523480156200001157600080fd5b5060405162001adf38038062001adf833981810160405281019062000037919062000319565b82600390805190602001906200004f929190620001c9565b50806004908051906020019062000068929190620001c9565b5081600560006101000a81548160ff021916908360ff1602179055508360028190555033600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600254600080600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600254604051620001b79190620003c8565b60405180910390a35050505062000561565b828054620001d79062000499565b90600052602060002090601f016020900481019282620001fb576000855562000247565b82601f106200021657805160ff191683800117855562000247565b8280016001018555821562000247579182015b828111156200024657825182559160200191906001019062000229565b5b5090506200025691906200025a565b5090565b5b80821115620002755760008160009055506001016200025b565b5090565b6000620002906200028a8462000419565b620003e5565b905082815260208101848484011115620002a957600080fd5b620002b684828562000463565b509392505050565b600082601f830112620002d057600080fd5b8151620002e284826020860162000279565b91505092915050565b600081519050620002fc816200052d565b92915050565b600081519050620003138162000547565b92915050565b600080600080608085870312156200033057600080fd5b60006200034087828801620002eb565b945050602085015167ffffffffffffffff8111156200035e57600080fd5b6200036c87828801620002be565b93505060406200037f8782880162000302565b925050606085015167ffffffffffffffff8111156200039d57600080fd5b620003ab87828801620002be565b91505092959194509250565b620003c2816200044c565b82525050565b6000602082019050620003df6000830184620003b7565b92915050565b6000604051905081810181811067ffffffffffffffff821117156200040f576200040e620004fe565b5b8060405250919050565b600067ffffffffffffffff821115620004375762000436620004fe565b5b601f19601f8301169050602081019050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156200048357808201518184015260208101905062000466565b8381111562000493576000848401525b50505050565b60006002820490506001821680620004b257607f821691505b60208210811415620004c957620004c8620004cf565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000538816200044c565b81146200054457600080fd5b50565b620005528162000456565b81146200055e57600080fd5b50565b61156e80620005716000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a9059cbb11610066578063a9059cbb1461028a578063d4ee1d90146102ba578063dd62ed3e146102d8578063f2fde38b14610308576100f5565b806370a082311461020257806379ba50971461023257806395d89b411461023c578063a457c2d71461025a576100f5565b80632230b0c3116100d35780632230b0c31461016657806323b872dd14610184578063313ce567146101b457806339509351146101d2576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b610102610324565b60405161010f9190611237565b60405180910390f35b610132600480360381019061012d9190610eac565b6103b6565b60405161013f919061121c565b60405180910390f35b6101506103d9565b60405161015d9190611339565b60405180910390f35b61016e6103e3565b60405161017b9190611201565b60405180910390f35b61019e60048036038101906101999190610e5d565b610409565b6040516101ab919061121c565b60405180910390f35b6101bc610438565b6040516101c99190611354565b60405180910390f35b6101ec60048036038101906101e79190610eac565b61044f565b6040516101f9919061121c565b60405180910390f35b61021c60048036038101906102179190610df8565b610486565b6040516102299190611339565b60405180910390f35b61023a6104ce565b005b61024461066d565b6040516102519190611237565b60405180910390f35b610274600480360381019061026f9190610eac565b6106ff565b604051610281919061121c565b60405180910390f35b6102a4600480360381019061029f9190610eac565b610776565b6040516102b1919061121c565b60405180910390f35b6102c2610799565b6040516102cf9190611201565b60405180910390f35b6102f260048036038101906102ed9190610e21565b6107bf565b6040516102ff9190611339565b60405180910390f35b610322600480360381019061031d9190610df8565b610846565b005b60606003805461033390611469565b80601f016020809104026020016040519081016040528092919081815260200182805461035f90611469565b80156103ac5780601f10610381576101008083540402835291602001916103ac565b820191906000526020600020905b81548152906001019060200180831161038f57829003601f168201915b5050505050905090565b6000806103c16108e4565b90506103ce8185856108ec565b600191505092915050565b6000600254905090565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806104146108e4565b9050610421858285610ab7565b61042c858585610b43565b60019150509392505050565b6000600560009054906101000a900460ff16905090565b60008061045a6108e4565b905061047b81858561046c85896107bf565b610476919061138b565b6108ec565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461052857600080fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60606004805461067c90611469565b80601f01602080910402602001604051908101604052809291908181526020018280546106a890611469565b80156106f55780601f106106ca576101008083540402835291602001916106f5565b820191906000526020600020905b8154815290600101906020018083116106d857829003601f168201915b5050505050905090565b60008061070a6108e4565b9050600061071882866107bf565b90508381101561075d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075490611319565b60405180910390fd5b61076a82868684036108ec565b60019250505092915050565b6000806107816108e4565b905061078e818585610b43565b600191505092915050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108a057600080fd5b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561095c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610953906112f9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c390611279565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610aaa9190611339565b60405180910390a3505050565b6000610ac384846107bf565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610b3d5781811015610b2f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2690611299565b60405180910390fd5b610b3c84848484036108ec565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610bb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610baa906112d9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c23576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1a90611259565b60405180910390fd5b610c2e838383610dc4565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610cb4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cab906112b9565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d47919061138b565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610dab9190611339565b60405180910390a3610dbe848484610dc9565b50505050565b505050565b505050565b600081359050610ddd8161150a565b92915050565b600081359050610df281611521565b92915050565b600060208284031215610e0a57600080fd5b6000610e1884828501610dce565b91505092915050565b60008060408385031215610e3457600080fd5b6000610e4285828601610dce565b9250506020610e5385828601610dce565b9150509250929050565b600080600060608486031215610e7257600080fd5b6000610e8086828701610dce565b9350506020610e9186828701610dce565b9250506040610ea286828701610de3565b9150509250925092565b60008060408385031215610ebf57600080fd5b6000610ecd85828601610dce565b9250506020610ede85828601610de3565b9150509250929050565b610ef1816113e1565b82525050565b610f00816113f3565b82525050565b6000610f118261136f565b610f1b818561137a565b9350610f2b818560208601611436565b610f34816114f9565b840191505092915050565b6000610f4c60238361137a565b91507f45524332303a207472616e7366657220746f20746865207a65726f206164647260008301527f65737300000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000610fb260228361137a565b91507f45524332303a20617070726f766520746f20746865207a65726f20616464726560008301527f73730000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611018601d8361137a565b91507f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006000830152602082019050919050565b600061105860268361137a565b91507f45524332303a207472616e7366657220616d6f756e742065786365656473206260008301527f616c616e636500000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006110be60258361137a565b91507f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008301527f64726573730000000000000000000000000000000000000000000000000000006020830152604082019050919050565b600061112460248361137a565b91507f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b600061118a60258361137a565b91507f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008301527f207a65726f0000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6111ec8161141f565b82525050565b6111fb81611429565b82525050565b60006020820190506112166000830184610ee8565b92915050565b60006020820190506112316000830184610ef7565b92915050565b600060208201905081810360008301526112518184610f06565b905092915050565b6000602082019050818103600083015261127281610f3f565b9050919050565b6000602082019050818103600083015261129281610fa5565b9050919050565b600060208201905081810360008301526112b28161100b565b9050919050565b600060208201905081810360008301526112d28161104b565b9050919050565b600060208201905081810360008301526112f2816110b1565b9050919050565b6000602082019050818103600083015261131281611117565b9050919050565b600060208201905081810360008301526113328161117d565b9050919050565b600060208201905061134e60008301846111e3565b92915050565b600060208201905061136960008301846111f2565b92915050565b600081519050919050565b600082825260208201905092915050565b60006113968261141f565b91506113a18361141f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156113d6576113d561149b565b5b828201905092915050565b60006113ec826113ff565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611454578082015181840152602081019050611439565b83811115611463576000848401525b50505050565b6000600282049050600182168061148157607f821691505b60208210811415611495576114946114ca565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b611513816113e1565b811461151e57600080fd5b50565b61152a8161141f565b811461153557600080fd5b5056fea2646970667358221220856bc42b9db5dd8191862e58b7fbcb051be75c44cb1d16cc41464fadfbf5569464736f6c63430008000033';

var metamaskStatus = $('#metamask-status');
var accountAddress = $('#current-address');
var currentNetwork = $('#current-network');
var iconLocked = $('#icon-locked');
var iconUnlocked = $('#icon-unlocked');
var metamaskLocked = $('#metamask-locked');
var metamaskUnlocked = $('#metamask-unlocked');

var assetForm = $('#asset-form');
var assetFormInput = $('#asset-form :input');

//刷新
var btnAgain = $('#btnAgain');

//disable all form input fields
assetFormInput.prop("disabled", true);

window.addEventListener('load', async () => {
    metamaskLocked.show();
    iconLocked.show();

    //reload window
    $('#btnAgain').bind('click',function(e){
        e.preventDefault();
        window.location.href=window.location.href;
    });

    // New ethereum provider
    if (window.ethereum) {
        console.log("New ethereum provider detected");
        // Instance web3 with the provided information
        web3 = new Web3(window.ethereum);
        // ask user for permission
        metamaskStatus
            .html('Please allow MetaMask to view your addresses')
            .css({
                "text-align": "center",
                "color": "#0000ff"
            })
            .show();
        window.ethereum.enable().then(function (abc) {
            // user approved permission
            console.log("abc ===>", abc)
            start()
        }).catch(function (error) {
            metamaskStatus.css({ "color": "#ff0000" })
            // user rejected permission
            if (error.code == 4001) {
                metamaskStatus.html('You reject the permission request, Please refresh to try again');
                console.log("User rejected the permission request.");
            } else if (error.code == -32002) {
                metamaskStatus.html("Metamask permission request is already pending</br>Open Metamask to allow")
                    .css({ "color": "#ffa500" });
            } else {
                metamaskStatus.html(error.message);
                console.error("Error while try to connect with Metamask", error);
            }
        });
    }
    // Old web3 provider
    else if (web3 && Object.keys(web3).length) {
        console.log("Old web3 provider detected");
        start()
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected || web3 not exits');
        metamaskStatus.html('You do not appear to be connected to the ETHO network. To use this service and deploy your contract, we recommend using the <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask</a> plugin for Google Chrome, which allows your web browser to connect to the ETHO network.').show();
    }
});

function handleAccountsChanged(accounts) {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
}

function handleChainChanged(_chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
}

function metamaskEvents() {
    ethereum.on('accountsChanged', handleAccountsChanged)
        .on('chainChanged', handleChainChanged)
        .on('connect', function (a, b, c) {
            debugger;
        })
        .on('disconnect', function (a, b, c) {
            debugger;
        })
        .on('message', function (a, b, c) {
            debugger;
        });
}

function start() {
   

    provider = web3.currentProvider;
    assetFormInput.prop("disabled", false);
    metamaskStatus.hide()
    // metamaskEvents()
    getEthNetworkId()
        .then(function (networkId) {
            if (networkId === '1') {
                isMainNetwork = true;
                currentNetwork.text('You are currently at Mainnet').show();
            } else if (networkId === '1313114') {
                isETHO = true;
                currentNetwork.text('Your are currently at ETHO Network.').show();
            } else
                currentNetwork.text('Your current network id is ' + networkId).show();
        })
        .fail(function (err) {
            console.log(err)
        });

    setInterval(function () {
        isLocked()
            .then(function (isLocked) {
                if (isLocked) {
                    isMetaMaskLocked = true;
                    metamaskUnlocked.hide();
                    accountAddress.hide();
                    metamaskLocked.show();
                    iconLocked.show();
                    assetFormInput.prop("disabled", true);
                    throw Error("Metamask Locked");
                }
                metamaskUnlocked.show();
                iconUnlocked.show();
                metamaskLocked.hide();
                iconLocked.hide();

                return getAccount()
            })
            .then(function (account) {
                if (account.length > 0) {
                    if (isMetaMaskLocked) {
                        isMetaMaskLocked = false;
                        assetFormInput.prop("disabled", false);
                    }
                    address = account[0];
                    return getBalance(account[0]);
                }
            })
            .then(function (balance) {
                accountAddress.html('<strong>Selected Account: ' + address + ' (' + balance + ' ETHO)</strong>').show();
            })
            .fail(function (err) {
                if (err.message !== "Metamask Locked")
                    console.log(err)
            });
    }, 1000);
}

function sendSync(params) {
    var defer = $.Deferred();
    provider.sendAsync(params, function (err, result) {
        if (err)
            return defer.reject(err.json());
        if (result['error'])
            return defer.reject(result['error']);
        defer.resolve(result)
    }
    );
    return defer.promise();
}

function getEthNetworkId() {
    return sendSync({ method: 'net_version', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err
        })
}

function requestAccounts() {
    return sendSync({ method: 'eth_requestAccounts' })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getAccount() {
    return sendSync({ method: 'eth_accounts', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getBalance(address) {
    return sendSync({ method: 'eth_getBalance', params: [address] })
        .then(function (result) {
            return web3.utils.fromWei(result['result']);
        })
        .fail(function (err) {
            return err;
        })
}

function isLocked() {
    return getAccount()
        .then(function (accounts) {
            return accounts.length <= 0;
        })
        .fail(function (err) {
            return err
        });
}


//call function on form submit
assetForm.submit(function (e) {
 
    //prevent the form from actually submitting.
    e.preventDefault();

    var initialSupply = $('#total-supply').val();
    var tokenName = $('#name').val();
    var decimalUnits = parseInt($('#decimals').val());
    var tokenSymbol = $('#symbol').val(); 

    if (tokenName === '') {
        alert('name can\'t be blank')
    } else if (tokenSymbol === '') {
        alert('symbol can\'t be blank')
    } else if (decimalUnits === '') {
        alert('decimals can\'t be blank')
    } else if (initialSupply === '') {
        alert('totalSupply can\'t be blank')
    } else {
        if(decimalUnits<0 || decimalUnits >18){
            alert("the range of the decimal is 0~18 ");
            return ;
        }
        //disable all form input fields
        //根据decimals 后面补相应位数的0
        // var origin = '000000000000000000';
        // if(decimalUnits >0){
        //     initialSupply = initialSupply  + origin.substr(0,decimalUnits);  
        // }       
        assetFormInput.prop("disabled", true);
        statusText.innerHTML = 'Waiting for contract to be deployed...';
        var standardtokenContract = new web3.eth.Contract(abi);
        standardtokenContract.deploy({
            data: '0x' + bytecode,
            arguments: [initialSupply, tokenName, decimalUnits, tokenSymbol]
        }).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error); 
                assetFormInput.prop("disabled", false);
                return;
            }
            //
            $("#submit-btn").addClass("hide_btn");
            $("#btnAgain").removeClass("hide_btn");
            $('#btnAgain').removeAttr("disabled"); 

            console.log('Transaction Hash :', transactionHash);
            if (isMainNetwork) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12).<br> <strong>Transaction hash: </strong><br> <a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isETHO) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong>Transaction hash: </strong><br> <a href="https://explorer.ethoprotocol.com/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else
                statusText.innerHTML = 'Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). Transaction hash: ' + transactionHash
        }).on('confirmation', function () {
            return;
        }).then(function (newContractInstance) {
            if (!newContractInstance.options.address) {
                console.log(newContractInstance);
                return;
            }
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
            var newContractAddress = newContractInstance.options.address;
            if (isMainNetwork) {
                statusText.innerHTML = 'Transaction  mined! Contract address: <a href="https://etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isETHO) {
                statusText.innerHTML = 'Transaction  mined! Contract address: <a href="https://explorer.ethoprotocol.com/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else
                statusText.innerHTML = 'Contract deployed at address <b>' + newContractAddress + '</b> - keep a record of this.'
        }).catch(function (error) {
            console.error(error);
            assetFormInput.prop("disabled", false);
        })
    }
});

function nthRoot(x, n) {
    if (x < 0 && n % 2 != 1) return NaN; // Not well defined
    return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1 / n);
}

function showNameTip(){
    toastMsgWarn(
        "Tip Name",
        "Name is simply what you want to call your token, such as MyToken or SuperToken",
        "toast-top-center"
      );
}

function showSymbolTip(){
    toastMsgWarn(
        "Tip Symbol",
        "Symbol will be the ticker of your token, such as BTC or ETH (normally tokens have a 3 letter uppercase symbol).",
        "toast-top-center"
      );
}
function showTotalTip(){
    toastMsgWarn(
        "Tip Total Supply",
        "Total Supply will be number of tokens available. Token Total Supply <strong>VALUE</strong> " +
        "will be total number of tokens to the power of decimal places. (eg. if total supply is 1000 and" +
        "decimals is 18 then give 1000000000000000000000 as a value.)",
        "toast-top-center"
      );
}
function showDecimalTip(){
    toastMsgWarn(
        "Tip Decimals",
        "Decimals is how many decimal places your token can have, which determines how " + 
        "divisible it is. Generally tokens will have 18 decimals, which allows 1 token to be divided into " +
        "trillions of pieces (eg. with 18 decimals you could have as little as 0.000000000000000001 of a "+
        "token).",
        "toast-top-center"
      );
}

//提示消息
function toastMsgSuccess(mainTitle, subTitle, position) {
    //This Is Success Message  Top Center toast-top-center
    toastr.success(subTitle, mainTitle, {
      positionClass: position,
      timeOut: 2000,
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1,
    });
  }
  function toastMsgWarn(mainTitle, subTitle, position) {
    //This Is Success Message  Top Center toast-top-center
    toastr.warning(subTitle, mainTitle, {
      positionClass: position,
      timeOut: 0,
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1,
    });
  }
  
  function toastMsgError(mainTitle, subTitle, position) {
    //This Is Success Message  Top Center toast-top-center
    toastr.error(subTitle, mainTitle, {
      positionClass: position,
      timeOut: 2500,
      closeButton: true,
      debug: false,
      newestOnTop: !0,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1,
    });
  }
   
  function toastShowWait(mainTitle,subTitle,position){
    toastr.warning(subTitle,mainTitle , {
        positionClass: position,
        timeOut: 10000,
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        preventDuplicates: !0,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: !1
    });
  }
  function toastClear(){
    toastr.clear();
  }

$("#decimals").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#decimals-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$("#total-supply").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#total-supply-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    } else {
        //TODO:show token total supply will be on bottom of total supply input
        // $("#total-supply").keyup(function (e) {
        //     if ($("#decimals").val() && $('#total-supply').val()) {
        //         console.log(Math.trunc($('#total-supply').val() / Math.pow(10, $("#decimals").val()))
        //     }
        // })
    }
});
