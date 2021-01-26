import React, {useEffect} from "react";
import Router from 'next/router'
import axios from "axios";


export default function CategorieSupprimer({item, errors}) {

    const handleDelete = async function(){
        await axios.delete(process.env.URL + '/api/categories/' + item._id)
            .then((res) => {
                console.log('Categorie successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
        Router.push("/admin/" + url)
    }

    useEffect(() => {
        handleDelete().then(r => console.log(r))
    });
    return (
        <>
        </>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params

    let item = {}
    let errors = []

    await axios.get(process.env.URL + "/api/categories/" + id)
        .then(res => {
            item = res.data.data
        })
        .catch((error) => {
            errors = JSON.stringify(error)
        })

    return {
        props: {item, errors}
    }
}
