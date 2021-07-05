import React from 'react';
import { signIn } from 'next-auth/client';

export default function Index() {
    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}
