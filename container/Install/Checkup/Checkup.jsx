import React, {
    useEffect, useState,
} from 'react';
import Loader from 'components/Loader/Loader';
import styles from 'container/Install/Checkup/Checkup.module.scss';

export default function Checkup({ environmentState, handleChangeEnvironmentState }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            handleChangeEnvironmentState({
                SECRET: process.env.SECRET !== undefined,
                MEDIA_SERVER: process.env.MEDIA_SERVER !== undefined,
                FTP_BASEDIR: process.env.FTP_BASEDIR !== undefined,
                FTP_URL: process.env.FTP_URL !== undefined,
                DB_URL: process.env.DB_URL !== undefined,
                LOCALE: process.env.LOCALE !== undefined,
                SERVER: process.env.SERVER !== undefined,
            });
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const Check = ({ state }) => (
        <div className={`${styles.check}`}>
            {
                state ? <span className={`fas fa-check ${styles.checked}`} /> : <span className='fas fa-times' />
            }
        </div>
    );

    return (
        <>
            <table className={`${styles.table}`}>
                <tbody>
                    <tr>
                        <th>
                            SERVER
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.SERVER} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>
                            MEDIA_SERVER
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.MEDIA_SERVER} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>
                            LOCALE
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.LOCALE} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>
                            DB_URL
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.DB_URL} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>
                            FTP_URL
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.FTP_URL} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>
                            FTP_BASEDIR
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.FTP_BASEDIR} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>
                            SECRET
                        </th>
                        <td>
                            {
                                loading
                                    ? <Loader />
                                    : <Check state={environmentState.SECRET} />
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
