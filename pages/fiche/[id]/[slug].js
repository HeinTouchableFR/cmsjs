import Head from "next/head";
import React from "react";
import axios from "axios";
import ProduitsGrid from "../../../components/Sites/Produit/produitsgrid.component";
import Header from "../../../components/Sites/Header/header.component";
import ProduitSingle from "../../../components/Sites/Produit/single.component";

export default function FicheProduit({ item, success, errors }) {
  return (
    <>
      <Header title={success ? item.nom : "Aucun produit trouvé"} />
      <div className="container">
        {success ? <ProduitSingle item={item} /> : "Pas de produit"}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id, slug } = params;

  let item = {};
  let success = false;
  let errors = [];

  await axios.get(process.env.URL + "/api/produits/" + id).then((res) => {
    item = res.data.data;
    success = res.data.success;
  });

  return {
    props: { item, success, errors },
  };
}
