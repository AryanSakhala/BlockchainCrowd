import { donateEther, requestFunding, checkBalance } from '../web3';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';    
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";
import './App.css'

function Main() {
    const [userAddress, setUserAddress] = useState('');
    const [amount, setAmount] = useState('0');
    const [balance, setBalance] = useState('(Please call for Check Balance)');
   
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "approved/");

    useEffect(() => {
        async function getAccounts() {
            // get the contract address and user account from MetaMask
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.getAccounts();
            setUserAddress(accounts[0]);
        }
        getAccounts();
    }, []);


    

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { item, url }]);
                });
            });
        });

    }, []);



    useEffect(() => {
        checkBalance(setBalance);
    }, [userAddress]);

    const handleDonation = async () => {
        await window.ethereum.enable();
        donateEther(amount);
    }

    const handleDelete = (item) => {
        deleteObject(item).then(() => {
            setImageUrls((prev) => prev.filter(i => i.item !== item));
            alert("File deleted")
        });
    };

    const handleFundingRequest = (item) => {
        getDownloadURL(item).then((url) => {
            const number = item.name;  
            const parts = number.split("_");
            const amount = parts[0];
            const address = parts[1]; 
           
            const cleanedAmount = amount.trim();

            const cleanedAddress = address.trim();

            console.log(cleanedAddress); // "0xBCE8b276215dD342CbFC8975c37480c5e474BAcC"
         
            console.log(amount)
            console.log(address)
            requestFunding(cleanedAddress, cleanedAmount, userAddress).then(() => {
            handleDelete(item)
        })
        });
    };

    const handleBalanceCheck = async () => {

        checkBalance(setBalance);
    }

    return (
        <div className="App">
            <h3>Charity Dapp</h3>
            {/* <label className="amount-label">

                Amount:
                <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
            </label> */}

            <h2>
                Welcome to Crowd Funding
            </h2>
            <div className="buttons-container">
                {/* <button onClick={handleDonation}>Donate</button> */}
                {/* <button onClick={handleBalanceCheck}>Check Balance</button> */}

                <ul>
                    {imageUrls.map(({ item, url }) => {
                        return (
                            <li key={url}>
                                <img src={url} />
                                <h4>{item.name.split("_")[1].slice(0, 5)}***{item.name.split("_")[1].slice(-4)}</h4>
                                <button className="button" onClick={() => handleFundingRequest(item)}>Donate Amount</button>
                                
                            </li>
                        );
                    })}
                </ul>
            </div>




            {/* <h2>Balance: {balance} Eth</h2> */}
        </div>
    );
}

export default Main;