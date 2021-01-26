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
    }

    useEffect(() => {
        handleDelete().then(r => console.log(r))
        Router.push('/admin/categories')
    });
    return (
        <>
        </>
    )
}

export async function getStaticPaths() {

    let data = []

    await axios.get(process.env.URL + '/api/categories/')
        .then(res => {
            data = res.data.data
        })
        .catch((error) => {
            console.log(error)
        })

    return {
        paths: data.map((item) => ({ params: { id: item._id } })),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
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
