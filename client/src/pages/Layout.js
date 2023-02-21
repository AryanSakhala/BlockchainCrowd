import { Outlet, Link } from "react-router-dom";
import { donateEther, requestFunding, checkBalance } from '../web3';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './Layout.css';

const Layout = () => {

    const [userAddress, setUserAddress] = useState('');
    const [amount, setAmount] = useState('0');
    const [balance, setBalance] = useState('(Please call for Check Balance)');
    const contractAddress = "0x7805E5dF0aE55402c969d1c6f9bdD4D1784b89C3"

    const handleFundingRequest = async () => {
        await window.ethereum.enable();

        requestFunding(contractAddress, userAddress, amount);
    }

    return (
        <div>
            
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/benificiary">Benificiary</Link>
                    </li>
                    <li>
                        <Link to="/main">Donation</Link>
                    </li>
                    <li>
                        <Link to="/login">NGO</Link>
                    </li>

                    
                </ul>
            </nav>
            
            <Outlet />

         
        
        </div>
    )
};

export default Layout;