import React, { useState } from "react";
import Header from "../../../components/Header/header.component";
import Head from "next/head";
import Content from "../../../components/Content/content.component";

export default function Attributs({items, errors}) {
    return (
        <>
            <Head>
                <title>Attributs</title>
            </Head>
            <Header>
                <Content titre="Attributs" icon="fa-cubes" url={"attributs"}>
                    {items}
                </Content>
            </Header>
        </>
    )
}

