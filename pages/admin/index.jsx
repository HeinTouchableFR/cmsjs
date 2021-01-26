import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Header from "./components/Header/header.component";

export default function HomeAdmin() {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                      crossOrigin="anonymous"/>
                <title>Administration</title>
            </Head>
            <Header/>
        </>
    )
}
