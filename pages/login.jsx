import React, { useEffect } from 'react';
import { signIn } from 'next-auth/client';

export default function Login() {
    useEffect(() => {
        signIn();
    }, []);

    return (<></>);
}
