import React, {useState} from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Loader from 'components/Loader/Loader';
import Button from '../../../components/Button/Button';

export default function Index() {
    const [loading, setLoading] = useState(false)
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Loader size='small' />
                <Loader size='normal' />
                <Loader size='big' />
                <Button label='Mon bouton' onClick={() => setLoading(!loading)} loading={loading} />
            </div>
        </>
    );
}
