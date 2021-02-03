import Head from 'next/head'
import styles from '../style/Home.module.css'
import Header from "../components/Sites/Header/header.component";
import React from "react";
import ProduitsGrid from "../components/Sites/Produit/produitsgrid.component";
import axios from "axios";

export default function Error404() {
    return (
        <>
            <Header title={"HomePage"} />
            <div className="container">
                :(
            </div>
        </>
    )
}
