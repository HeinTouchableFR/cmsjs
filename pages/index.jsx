import Head from 'next/head'
import styles from '../style/Home.module.css'
import Header from "../components/Sites/Header/header.component";
import React from "react";
import ProduitsGrid from "../components/Sites/Produit/produitsgrid.component";
import axios from "axios";

export default function Home({items}) {
    return (
        <>
          <Header title={"HomePage"} />
          <div className="container">
              <ProduitsGrid items={items} />
          </div>
        </>
    )
}

export async function getServerSideProps() {

    let items = []

    await axios.get(process.env.URL + '/api/produits')
        .then(res => {
            items = res.data.data
        })
        .catch((error) => {

        })


    return {
        props: {items}
    }
}
