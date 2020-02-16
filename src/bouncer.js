import web3 from "./web3";

//Target contract address
const address = "0x967acd904e7b4a79e64881168027B8123f3C1Af1";

//ABI taken from skale contract
const abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "hashTable",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "accessCode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "hashedEmail",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "encryptedPublicKey",
          "type": "string"
        }
      ],
      "name": "addKey",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "accessCode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "hashedEmail",
          "type": "string"
        }
      ],
      "name": "deleteKey",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "accessCode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "hashedEmail",
          "type": "string"
        }
      ],
      "name": "getKey",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

export default new web3.eth.Contract(abi, address);
