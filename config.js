module.exports = function(WeiFund){

  /**
  WeiFund config

  @module WeiFund
  **/

  /**
  The default from account index.

  e.g 1 would be used like web3.eth.accounts[1];

  @var (account)
  **/

  WeiFund.account = 0;

  /**
  The ABI of the main contract.

  @var (abi)
  **/

  WeiFund.abi = [{
    "constant": false,
    "inputs": [{
      "name": "_name",
      "type": "bytes32"
    }, {
      "name": "_website",
      "type": "bytes32"
    }, {
      "name": "_video",
      "type": "bytes32"
    }, {
      "name": "_beneficiary",
      "type": "address"
    }, {
      "name": "_goal",
      "type": "uint256"
    }, {
      "name": "_timelimit",
      "type": "uint256"
    }, {
      "name": "_category",
      "type": "uint256"
    }],
    "name": "newCampaign",
    "outputs": [],
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "uint256"
    }],
    "name": "campaigns",
    "outputs": [{
      "name": "name",
      "type": "bytes32"
    }, {
      "name": "website",
      "type": "bytes32"
    }, {
      "name": "video",
      "type": "bytes32"
    }, {
      "name": "owner",
      "type": "address"
    }, {
      "name": "beneficiary",
      "type": "address"
    }, {
      "name": "timelimit",
      "type": "uint256"
    }, {
      "name": "fundingGoal",
      "type": "uint256"
    }, {
      "name": "amount",
      "type": "uint256"
    }, {
      "name": "category",
      "type": "uint256"
    }, {
      "name": "status",
      "type": "uint256"
    }, {
      "name": "numFunders",
      "type": "uint256"
    }],
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_addr",
      "type": "address"
    }, {
      "name": "_u_cid",
      "type": "uint256"
    }],
    "name": "userCampaigns",
    "outputs": [{
      "name": "cid",
      "type": "uint256"
    }],
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_cid",
      "type": "uint256"
    }],
    "name": "refund",
    "outputs": [],
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "numCampaigns",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "address"
    }],
    "name": "users",
    "outputs": [{
      "name": "numCampaigns",
      "type": "uint256"
    }],
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_cid",
      "type": "uint256"
    }],
    "name": "contribute",
    "outputs": [],
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_cid",
      "type": "uint256"
    }],
    "name": "payout",
    "outputs": [],
    "type": "function"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_cid",
      "type": "uint256"
    }],
    "name": "onNewCampaign",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_cid",
      "type": "uint256"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "onContribute",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_cid",
      "type": "uint256"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "onPayout",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_cid",
      "type": "uint256"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "onRefund",
    "type": "event"
  }]

  /**
  The Hex code of the contract.

  @var (hex)
  **/

  // cpp
  // WeiFund.hex = "6108d08061000e6000396000f3006000357c0100000000000000000000000000000000000000000000000000000000900480630c9d7d481461007c578063141961bc1461009f57806319ac74bd1461010c578063278ecde1146101245780632c0f7b6f14610135578063a87430ba14610147578063c1cbbca71461015c578063e11523431461016d57005b61009960043560243560443560643560843560a43560c435610266565b60006000f35b6100aa600435610189565b8a60005289602052886040528773ffffffffffffffffffffffffffffffffffffffff166060528673ffffffffffffffffffffffffffffffffffffffff166080528560a0528460c0528360e0528261010052816101205280610140526101606000f35b61011a60043560243561086d565b8060005260206000f35b61012f60043561059f565b60006000f35b61013d61017f565b8060005260206000f35b610152600435610242565b8060005260206000f35b61016760043561042d565b60006000f35b61017860043561075a565b60006000f35b5b60006000505481565b5b60016000506020528060005260406000206000915090508060000160005054908060010160005054908060020160005054908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600501600050549080600601600050549080600701600050549080600801600050549080600901600050549080600a016000505490508b565b5b60026000506020528060005260406000206000915090508060000160005054905081565b60006000600060006000600060008911801561028157504288115b61028a5761041d565b600060008181505480929190600101919050559550600160005060008781526020019081526020016000206000945094508c858550600001600050819055508b858550600101600050819055508a858550600201600050819055503385855060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508985855060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550888585506006016000508190555087858550600501600050819055508685855060080160005081905550600260005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000925092508282506000016000818150548092919060010191905055905085838350600101600050600083815260200190815260200160002060005081905550853373ffffffffffffffffffffffffffffffffffffffff167f882da991e52c8933ce57314c9ba3f934798d912d862790c40d0feeb7025af08a6040604090036040a35b5b50505050505050505050505050565b600060006000600060006000341161044457610596565b600160005060008781526020019081526020016000206000945094504285855060050160005054101561047657610595565b848450600a0160008181505480929190600101919050559250848450600b0160005060008481526020019081526020016000206000915091503382825060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555034828250600101600050819055508181506001016000505485855060070160008282825054019250508190555082858550600c0160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550853373ffffffffffffffffffffffffffffffffffffffff167fc5e578961e5bd7481ccf1d1bdfbad97b9f1ddfad520f061ca764a57018f3febe6040888850600701600050548152602001604090036040a35b5b5b505050505050565b60006000600060006001600050600086815260200190815260200160002060009350935083835060050160005054421180156105ec57508383506006016000505484845060070160005054105b80156106015750600084845060070160005054115b61060a57610752565b838350600b016000506000858550600c0160005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505481526020019081526020016000206000915091506000828250600101600050541161067357610751565b81815060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000838350600101600050546000600060006000848787f16106ce57005b50505081815060010160005054848450600701600082828250540392505081905550843373ffffffffffffffffffffffffffffffffffffffff167fe139691e7435f1fb40ec50ed3729009226be49087fd00e9e5bac276c2a8f40cf6040858550600101600050548152602001604090036040a36000828250600101600050819055505b5b5b5050505050565b60006000600160005060008481526020019081526020016000206000915091508181506006016000505482825060070160005054101561079957610867565b81815060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000838350600701600050546000600060006000848787f16107f457005b505050823373ffffffffffffffffffffffffffffffffffffffff167f6be92574b1386f424263a096e8b66ff6cc223ab0f9d18702563aa339a372cf986040858550600701600050548152602001604090036040a36000828250600701600050819055506001828250600901600050819055505b5b505050565b600060006000600260005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600091509150818150600101600050600085815260200190815260200160002060005054925082505b50509291505056"
  // cosmo
                 // 6106b08061000e6000396000f3007c010000000000000000000000000000000000000000000000000000000060003504630c9d7d48811461007b578063141961bc146100b757806319ac74bd14610127578063278ecde1146101645780632c0f7b6f146101b3578063a87430ba146101bd578063c1cbbca7146101d6578063e1152343146101f357005b61022060043560243560443560643560843560a43560c4356000600060006000600060006000891180156100ae57504288115b61050e576106a1565b6001602081905260048035600090815260409020805492810154600282015460038301549383015460058401546006850154600786015460088701546009880154600a909801546102269a999798969773ffffffffffffffffffffffffffffffffffffffff90811697961695908b565b60043573ffffffffffffffffffffffffffffffffffffffff1660009081526002602090815260408083206024358452600101825282205480835291f35b600435600081815260016020526040812060058101546102889392908190829042118015610199575060068401546007850154105b80156101aa57506007840154600090115b61039157610441565b60005461028e9081565b6002602052600435600090815260409020546102989081565b6102a260043560006000600060006000600034116102ae57610389565b6004356000818152600160205260408120600681015460078201546102a894939190101561047957610509565b60006000f35b8a60005289602052886040528773ffffffffffffffffffffffffffffffffffffffff166060528673ffffffffffffffffffffffffffffffffffffffff166080528560a0528460c0528360e0528261010052816101205280610140526101606000f35b60006000f35b8060005260206000f35b8060005260206000f35b60006000f35b60006000f35b60008681526001602052604081206005810154909650909450429010156102d457610388565b505050600a8201805460018082019092556000818152600b85016020908152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000001633908117825534968201879055600789018054909701875573ffffffffffffffffffffffffffffffffffffffff16808552600c89018452828520869055955482529394889290917fc5e578961e5bd7481ccf1d1bdfbad97b9f1ddfad520f061ca764a57018f3febe9190a35b5b505050505050565b505073ffffffffffffffffffffffffffffffffffffffff33166000908152600c830160209081526040808320548352600b85019091528120600181015490919081901161044857610440565b505050600182018054600786018054919091039055546040908152859073ffffffffffffffffffffffffffffffffffffffff3316907fe139691e7435f1fb40ec50ed3729009226be49087fd00e9e5bac276c2a8f40cf90602090a3600060018301555b5b5050505050565b8154600183015473ffffffffffffffffffffffffffffffffffffffff9091169060009081828384848787f16103dd57005b6004820154600783015473ffffffffffffffffffffffffffffffffffffffff9091169060009081828384848787f16104ad57005b50505060078201546040908152839073ffffffffffffffffffffffffffffffffffffffff3316907f6be92574b1386f424263a096e8b66ff6cc223ab0f9d18702563aa339a372cf9890602090a360006007830155600160098301555b505050565b600060008181505480929190600101919050559550600160005060008781526020019081526020016000206000945094508c858550600001600050819055508b858550600101600050819055508a858550600201600050819055503385855060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508985855060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550888585506006016000508190555087858550600501600050819055508685855060080160005081905550600260005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000925092508282506000016000818150548092919060010191905055905085838350600101600050600083815260200190815260200160002060005081905550853373ffffffffffffffffffffffffffffffffffffffff167f882da991e52c8933ce57314c9ba3f934798d912d862790c40d0feeb7025af08a6040604090036040a35b5050505050505050505050505056
  // martin               
                 // 6106b08061000e6000396000f3007c010000000000000000000000000000000000000000000000000000000060003504630c9d7d48811461007b578063141961bc146100b757806319ac74bd14610127578063278ecde1146101645780632c0f7b6f146101b3578063a87430ba146101bd578063c1cbbca7146101d6578063e1152343146101f357005b61022060043560243560443560643560843560a43560c4356000600060006000600060006000891180156100ae57504288115b610426576105b9565b6001602081905260048035600090815260409020805492810154600282015460038301549383015460058401546006850154600786015460088701546009880154600a909801546102269a999798969773ffffffffffffffffffffffffffffffffffffffff90811697961695908b565b60043573ffffffffffffffffffffffffffffffffffffffff1660009081526002602090815260408083206024358452600101825282205480835291f35b600435600081815260016020526040812060058101546102889392908190829042118015610199575060068401546007850154105b80156101aa57506007840154600090115b6105c857610678565b60005461028e9081565b6002602052600435600090815260409020546102989081565b6102a260043560006000600060006000600034116102ae57610389565b6004356000818152600160205260408120600681015460078201546102a894939190101561039157610421565b60006000f35b8a60005289602052886040528773ffffffffffffffffffffffffffffffffffffffff166060528673ffffffffffffffffffffffffffffffffffffffff166080528560a0528460c0528360e0528261010052816101205280610140526101606000f35b60006000f35b8060005260206000f35b8060005260206000f35b60006000f35b60006000f35b60008681526001602052604081206005810154909650909450429010156102d457610388565b505050600a8201805460018082019092556000818152600b85016020908152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000001633908117825534968201879055600789018054909701875573ffffffffffffffffffffffffffffffffffffffff16808552600c89018452828520869055955482529394889290917fc5e578961e5bd7481ccf1d1bdfbad97b9f1ddfad520f061ca764a57018f3febe9190a35b5b505050505050565b6004820154600783015473ffffffffffffffffffffffffffffffffffffffff9091169060009081828384848787f16103c557005b50505060078201546040908152839073ffffffffffffffffffffffffffffffffffffffff3316907f6be92574b1386f424263a096e8b66ff6cc223ab0f9d18702563aa339a372cf9890602090a360006007830155600160098301555b505050565b600060008181505480929190600101919050559550600160005060008781526020019081526020016000206000945094508c858550600001600050819055508b858550600101600050819055508a858550600201600050819055503385855060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508985855060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550888585506006016000508190555087858550600501600050819055508685855060080160005081905550600260005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000925092508282506000016000818150548092919060010191905055905085838350600101600050600083815260200190815260200160002060005081905550853373ffffffffffffffffffffffffffffffffffffffff167f882da991e52c8933ce57314c9ba3f934798d912d862790c40d0feeb7025af08a6040604090036040a35b50505050505050505050505050565b505073ffffffffffffffffffffffffffffffffffffffff33166000908152600c830160209081526040808320548352600b85019091528120600181015490919081901161067f57610677565b505050600182018054600786018054919091039055546040908152859073ffffffffffffffffffffffffffffffffffffffff3316907fe139691e7435f1fb40ec50ed3729009226be49087fd00e9e5bac276c2a8f40cf90602090a3600060018301555b5b5050505050565b8154600183015473ffffffffffffffffffffffffffffffffffffffff9091169060009081828384848787f16106145700
  // joseph
     WeiFund.hex = "6108fa8061000e6000396000f3006000357c0100000000000000000000000000000000000000000000000000000000900480630c9d7d481461007c578063141961bc146100b757806319ac74bd1461012a578063278ecde11461014b5780632c0f7b6f14610162578063a87430ba14610177578063c1cbbca714610192578063e1152343146101a957005b6100b160048035906020018035906020018035906020018035906020018035906020018035906020018035906020015061030b565b60006000f35b6100c86004803590602001506101cb565b8a60005289602052886040528773ffffffffffffffffffffffffffffffffffffffff166060528673ffffffffffffffffffffffffffffffffffffffff166080528560a0528460c0528360e0528261010052816101205280610140526101606000f35b6101416004803590602001803590602001506102a8565b8060005260206000f35b61015c600480359060200150610638565b60006000f35b61016d6004506101c1565b8060005260206000f35b610188600480359060200150610284565b8060005260206000f35b6101a36004803590602001506104ce565b60006000f35b6101ba6004803590602001506107eb565b60006000f35b5b60006000505481565b5b60016000506020528060005260406000206000915090508060000160005054908060010160005054908060020160005054908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600501600050549080600601600050549080600701600050549080600801600050549080600901600050549080600a016000505490508b565b5b60026000506020528060005260406000206000915090508060000160005054905081565b600060006000600260005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600091509150818150600101600050600085815260200190815260200160002060005054925082505b505092915050565b60006000600060006000600060008911801561032657504288115b156104be57600060008181505480929190600101919050559550600160005060008781526020019081526020016000206000945094508c858550600001600050819055508b858550600101600050819055508a858550600201600050819055503385855060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508985855060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550888585506006016000508190555087858550600501600050819055508685855060080160005081905550600260005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000925092508282506000016000818150548092919060010191905055905085838350600101600050600083815260200190815260200160002060005081905550853373ffffffffffffffffffffffffffffffffffffffff167f882da991e52c8933ce57314c9ba3f934798d912d862790c40d0feeb7025af08a6040604090036040a35b5b50505050505050505050505050565b60006000600060006000600034111561062f5760016000506000878152602001908152602001600020600094509450428585506005016000505410151561062e57848450600a0160008181505480929190600101919050559250848450600b0160005060008481526020019081526020016000206000915091503382825060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555034828250600101600050819055508181506001016000505485855060070160008282825054019250508190555082858550600c0160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550853373ffffffffffffffffffffffffffffffffffffffff167fc5e578961e5bd7481ccf1d1bdfbad97b9f1ddfad520f061ca764a57018f3febe6040888850600701600050548152602001604090036040a35b5b5b505050505050565b600060006000600060016000506000868152602001908152602001600020600093509350838350600501600050544211801561068557508383506006016000505484845060070160005054105b801561069a5750600084845060070160005054115b156107e357838350600b016000506000858550600c0160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054815260200190815260200160002060009150915060008282506001016000505411156107e25781815060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000838350600101600050546000600060006000848787f161075f57005b50505081815060010160005054848450600701600082828250540392505081905550843373ffffffffffffffffffffffffffffffffffffffff167fe139691e7435f1fb40ec50ed3729009226be49087fd00e9e5bac276c2a8f40cf6040858550600101600050548152602001604090036040a36000828250600101600050819055505b5b5b5050505050565b600060006001600050600084815260200190815260200160002060009150915081815060060160005054828250600701600050541015156108f45781815060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000838350600701600050546000600060006000848787f161088157005b505050823373ffffffffffffffffffffffffffffffffffffffff167f6be92574b1386f424263a096e8b66ff6cc223ab0f9d18702563aa339a372cf986040858550600701600050548152602001604090036040a36000828250600701600050819055506001828250600901600050819055505b5b50505056"

  /**
  The address of the WeiFund contract.

  @var (address)
  **/

  WeiFund.address = '0x88c3a13812e156232f7fdb6954a626042c58f889'

  /**
  Website URL.

  @var (url)
  **/

  WeiFund.url = 'http://WeiFund.io/';

  /**
  The image suffix for handling image urls in WeiFund.

  i.e. http://your_website.com/weifund.jpg

  @var (imageSuffix)
  **/

  WeiFund.imageSuffix = '/weifund.jpg';

  /**
  Available categories.

  @var (categories)
  **/

  WeiFund.categories = ["Buisness", "Technology", "Music", "Arts", "Cryptocurrency", "Dance", "Fashion", "Film", "Community", "Food", "Games", "Education", "Cause", "Politics"];

  /**
  The transaction hash of the WeiFund contract. For display purposes.

  @var (tx_hash)
  **/

  WeiFund.tx_hash = '0x0618faa5189babe5618f618faa5189babe586df5693db47aa5189babe586df5693db4786df5693618faa5189babe586df5693db47db47330694a27dcd';

  /**
  The default amount of gas to use for transactions.

  @var (defaultGas)
  **/

  WeiFund.defaultGas = 950000;

  // Setup WeiFund
  WeiFund.setup();


}