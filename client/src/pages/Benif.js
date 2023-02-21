import { Outlet, Link } from "react-router-dom";
import { requestFunding } from '../web3';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import './Benif.css';

const Benif = () => {

    const [userAddress, setUserAddress] = useState('');
    const [amount, setAmount] = useState('0');
    const [imageUpload, setImageUpload] = useState(null);
    const contractAddress = "0x7805E5dF0aE55402c969d1c6f9bdD4D1784b89C3"

    useEffect(() => {
        async function getAccounts() {
            // get the contract address and user account from MetaMask
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.getAccounts();
            setUserAddress(accounts[0]);
        }
        getAccounts();
    }, []);


    const uploadImage = () => {
        alert("Please make sure you have requested Funding")
        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/${amount} ${"_"} ${userAddress}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("File Uploaded")
        });

    };

    const handleFundingRequest = async () => {
        await window.ethereum.enable();

        requestFunding(contractAddress, userAddress, amount);
        alert("Accepted, Please choose a document")
    }

    return (

        <div className="App">
            <h1 >Non Profit Blockchain based Crowd Fundings</h1>
            <label className="amount-label">

                Amount:
                <input type="text" className="inputeth" value={amount} onChange={e => setAmount(e.target.value)} />
            </label>

            <button onClick={handleFundingRequest}>Request Funding</button>

            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadImage}> Upload Image</button>



        </div>

    )
};

export default Benif;

//https://console.firebase.google.com/project/crowdfund-b48e2/storage/crowdfund-b48e2.appspot.com/files/