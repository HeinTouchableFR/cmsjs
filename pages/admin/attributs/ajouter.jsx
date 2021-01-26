import React from "react";
import Header from "../../../components/Header/header.component";
import Head from "next/head";
import Content from "../../../components/Content/content.component";

export default function AjouterAttribut() {
    return (
        <>
            <Head>
                <title>Ajouter un attribut</title>
            </Head>
            <Header>
                <Content titre="Ajouter un attribut" icon="fa-cubes" url={"attributs"} action={"ajouter"}>
                    Contenu
                </Content>
            </Header>
        </>
    )
}
