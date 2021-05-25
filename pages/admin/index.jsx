import React from 'react';

export default function Home() {
    return <></>;
}

export const getServerSideProps = async () => ({
    redirect: {
        permanent: true,
        destination: '/admin/dashboard',
    },
    props: {
    },
});
