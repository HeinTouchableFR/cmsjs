import React from 'react';
import Card from 'components/Cards/Card/Card';
import styles from './NewCustomers.module.scss';

export default function NewCustomers({ Customers }) {
    return (
        <>
            <div className='customers'>
                <Card
                    color='yellow'
                >
                    <Card.Header
                        title='New Customer'
                    />
                    <Card.Body>
                        <div className={styles.customer}>
                            <div className={styles.info}>
                                <img
                                    src='/placeholder.png'
                                    alt=''
                                />
                                <div>
                                    <h4>Lhomme Aymeric</h4>
                                    <small>Super admin</small>
                                </div>
                            </div>
                            <div className={styles.contact}>
                                <span className='fas fa-user-circle' />
                                <span className='fas fa-comment' />
                                <span className='fas fa-phone' />
                            </div>
                        </div>
                        <div className={styles.customer}>
                            <div className={styles.info}>
                                <img
                                    src='/placeholder.png'
                                    alt=''
                                />
                                <div>
                                    <h4>Lhomme Aymeric</h4>
                                    <small>Super admin</small>
                                </div>
                            </div>
                            <div className={styles.contact}>
                                <span className='fas fa-user-circle' />
                                <span className='fas fa-comment' />
                                <span className='fas fa-phone' />
                            </div>
                        </div>
                        <div className={styles.customer}>
                            <div className={styles.info}>
                                <img
                                    src='/placeholder.png'
                                    alt=''
                                />
                                <div>
                                    <h4>Lhomme Aymeric</h4>
                                    <small>Super admin</small>
                                </div>
                            </div>
                            <div className={styles.contact}>
                                <span className='fas fa-user-circle' />
                                <span className='fas fa-comment' />
                                <span className='fas fa-phone' />
                            </div>
                        </div>
                        <div className={styles.customer}>
                            <div className={styles.info}>
                                <img
                                    src='/placeholder.png'
                                    alt=''
                                />
                                <div>
                                    <h4>Lhomme Aymeric</h4>
                                    <small>Super admin</small>
                                </div>
                            </div>
                            <div className={styles.contact}>
                                <span className='fas fa-user-circle' />
                                <span className='fas fa-comment' />
                                <span className='fas fa-phone' />
                            </div>
                        </div>
                        <div className={styles.customer}>
                            <div className={styles.info}>
                                <img
                                    src='/placeholder.png'
                                    alt=''
                                />
                                <div>
                                    <h4>Lhomme Aymeric</h4>
                                    <small>Super admin</small>
                                </div>
                            </div>
                            <div className={styles.contact}>
                                <span className='fas fa-user-circle' />
                                <span className='fas fa-comment' />
                                <span className='fas fa-phone' />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
