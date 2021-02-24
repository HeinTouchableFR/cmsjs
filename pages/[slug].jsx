import React from 'react';
import axios from 'axios';
import Header from 'container/Sites/Header/Header';
import RenderPage from 'container/Builder/RenderPage';

export default function Page({ post }) {
    return (
        <>
            <Header title={post.title} />
            <div className='container'>
                <RenderPage page={post} />
            </div>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const { slug } = params;

    let post = {};
    let success = false;
    let errors = [];

    await axios.get(process.env.URL + '/api/pages/slug/' + slug).then((res) => {
        post = res.data.data;
        success = res.data.success;
    });

    return {
        props: { post },
    };
}
