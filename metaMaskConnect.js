document.addEventListener('DOMContentLoaded', function() {
  const connectButton = document.getElementById('connectButton');
  const balanceElement = document.getElementById('balance');
  const contractValueElement = document.getElementById('contractValue');

  const contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contractAddress = '0x11065d625e7D9D7801431dF623EA17A84651188a'; // Replace with your contract address

  connectButton.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Set up Web3 instance
        window.web3 = new Web3(window.ethereum);
        // Get accounts
        const accounts = await window.web3.eth.getAccounts();
        alert('Connected account: ' + accounts[0]);

        // Get balance
        const balance = await window.web3.eth.getBalance(accounts[0]);
        const ethBalance = window.web3.utils.fromWei(balance, 'ether');
        balanceElement.textContent = 'Balance: ' + ethBalance + ' ETH';

        // Interact with smart contract
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);
        const contractValue = await contract.methods.get().call();
        contractValueElement.textContent = 'Contract Value: ' + contractValue;
      } catch (error) {
        console.error('User denied account access or there was an error');
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  });
});
