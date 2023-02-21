import CrowdFund from './contract/CrowdFund'
import Web3 from 'web3';
import { useState } from 'react';
import { useEffect } from 'react';



let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch(error => {
        // User denied account access...
    });
} else if (window.web3) {
    // Legacy dapp browsers...
    web3 = new Web3(web3.currentProvider);
} else {
    // Non-dapp browsers...
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
}


const FundingABI = CrowdFund.abi
const FundingAddress = "0x497dEE559Cb9d5A00e9df8FC96C1A3085fD9B998";

const fundingContract = new web3.eth.Contract(FundingABI, FundingAddress);


async function donateEther(amount) {
    try {
        // convert the input amount to wei
        const weiAmount = web3.utils.toWei(amount, 'ether');
        // get the account address from metamask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        console.log("Account: ", account);

        // estimate the gas required for the donate function

        console.log("Estimated gas: ");
        // call the donate function
        await fundingContract.methods.donate().send({
            from: account,
            value: weiAmount,
            gas: 2162600
        });
        console.log("Donation successful");
    } catch (err) {
        console.error("Error: ", err);
    }
}




async function requestFunding(address, amount, userAddress) {
    try {
        const balance = await web3.eth.getBalance(address);
        console.log("Balance is ->")
        console.log(web3.utils.toWei(balance, "ether"))
        console.log("Amount is ->")
        console.log(web3.utils.toWei(amount, "ether"))
        const accounts = await web3.eth.getAccounts();
       
            await fundingContract.methods.requestMoney(address, web3.utils.toWei(amount, "ether")).send({ 
                from: userAddress,
                value: web3.utils.toWei(amount, "ether"),
                gas: 2562600 });

                alert("Donation is succesful")
       
    } catch (error) {
        console.log("An error occurred while trying to request funding: ", error);
    }
}




async function checkBalance(setBalance) {
    try {
        // Get the user's account
        const userAccount = (await web3.eth.getAccounts())[0];
        // Get the manager address from the smart contract
        const manager = await fundingContract.methods.manager().call();
        // Compare the user's account with the manager address
        if (userAccount !== manager) {
            console.log("Caller is not the manager");
            setBalance("Only manager can access this");
            return;
        }
        // Call the checkBalance function of the smart contract
        const balance = await fundingContract.methods.checkBalance().call({ from: userAccount });
        const ans = web3.utils.fromWei(balance, 'ether');
        setBalance(ans);
        console.log("The balance of the account in wei is: ", balance);
    } catch (error) {
        console.log("An error occurred while trying to check the balance: ", error);
    }
}






export { donateEther, requestFunding, checkBalance }
