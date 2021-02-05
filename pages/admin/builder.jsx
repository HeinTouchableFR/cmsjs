import Head from "next/head";
import Header from "../../components/Header/header.component";
import React from "react";
import {useRouter} from "next/router";
import Content from "../../components/Content/content.component";
import styles from "../style/table.module.scss";
import {Confirm} from "semantic-ui-react";
import Builder from "../../components/Builder/builder.component";


export default function Index() {

    //Page a créer ou modifier
    const page = {}
    page.nom = "Ma super Page"
    page.contenu =  {}
    page.contenu.dispositions = []

    return (
        <>
            <Builder page={page} />
        </>
    )
}
