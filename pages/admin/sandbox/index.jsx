import React from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Grid from 'container/Grid/Grid';

export default function Index() {
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Grid
                    columns={2}
                >
                    <Grid.Column>
                        zeffzeeefzfzezef zeffzeeefzfzezef zeffzeeefzfzezef zeffzeeefzfzezef zeffzeeefzfzezef zeffzeeefzfzezef
                    </Grid.Column>
                    <Grid.Column
                        align='right'
                    >
                        zeffzeeefzfzezef
                    </Grid.Column>
                </Grid>
            </div>
        </>
    );
}
