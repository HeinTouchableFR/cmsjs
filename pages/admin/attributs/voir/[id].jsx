import React from "react";
import Head from "next/head";
import Header from "../../../../components/Header/header.component";
import Content from "../../../../components/Content/content.component";
import axios from "axios";
import {Button, Card, Form, Input} from "semantic-ui-react";
import {ActionBoutonNoLink} from "../../../../components/Bouton/ActionBouton";

export default function Detail({item}) {

    const url = "attributs"

    return (
        <>
            <Head>
                <title>Détail de l'attribut {item.nom}</title>
            </Head>
            <Header>
                <Content titre="Attribut" icon="fa-cubes" url={url}>
                    <Form>
                        <Form.Input
                            fluid
                            label='Nom'
                            placeholder='Nom'
                            defaultValue={item.nom}
                            name='nom'
                            disabled
                        />
                        <Form.Checkbox
                            label="Utiliser l'attribut comme filtre de recherche produit"
                            name='filtre'
                            checked={item.filtre}
                            disabled
                        />
                        <div className="field">
                            <label>Valeurs</label>
                        </div>
                        {item.valeurs.map(item => <Valeur key={item._id} item={item}/>)}
                    </Form>
                </Content>
            </Header>
        </>
    )
}

const Valeur = function ({item}) {

    return <Card
        fluid
        color='teal'
    >
        <Card.Content header={item.nom}/>
        <Card.Content>
            <Input
                fluid
                label='Nom'
                placeholder='Nom'
                name='nom'
                defaultValue={item.nom}
                disabled
            />
        </Card.Content>
    </Card>
}


export async function getServerSideProps({params}) {
    const {id} = params

    let item = {}

    await axios.get(process.env.URL + "/api/attributs/" + id)
        .then(res => {
            item = res.data.data
        })
        .catch((error) => {
        })
    return {
        props: {item}
    }
}
