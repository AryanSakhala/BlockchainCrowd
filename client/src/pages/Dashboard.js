import React, { useState, useEffect } from 'react';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
    getMetadata
} from "firebase/storage";
import { storage } from "./firebase";
import './Dashboard.css'

const Dashboard = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { item, url }]);
                });
            });
        });

    }, []);

    const handleDelete = (item) => {
        deleteObject(item).then(() => {
            setImageUrls((prev) => prev.filter(i => i.item !== item));
            alert("File deleted")
        });
    };

    const handleApprove = (item) => {
        getDownloadURL(item).then((url) => {
            const approvedImageRef = ref(storage, "approved/" + item.name);
            fetch(url)
                .then((res) => res.arrayBuffer())
                .then((arrayBuffer) => {
                    uploadBytes(approvedImageRef, arrayBuffer).then(() => {
                        handleDelete(item);
                        alert("File moved to approved folder");
                    });
                });
        });
    };








    return (
        <div>
            <h1>Dashboard</h1>
            <h1>Welcome !</h1>
            <ul>
                {imageUrls.map(({ item, url }) => {
                    return (
                        <li key={url}>
                            <img src={url} />
                            <button className="button" onClick={() => handleDelete(item)}>Delete</button>
                            <button className="button" onClick={() => handleApprove(item)} >Approve</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Dashboard;

