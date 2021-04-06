import React from 'react';
import styles from './NewCustomers.module.scss';
import Card from 'components/Cards/Card/Card';

export default function NewCustomers({Customers}) {

    return (
        <>
            <div className={"customers"}>
                <Card title={"New Customer"}>
                    <div className={styles.customer}>
                        <div className={styles.info}>
                            <img src="/placeholder.png" alt=""/>
                            <div>
                                <h4>Lhomme Aymeric</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <span className="las la-user-circle"/>
                            <span className="las la-comment"/>
                            <span className="las la-phone"/>
                        </div>
                    </div>
                    <div className={styles.customer}>
                        <div className={styles.info}>
                            <img src="/placeholder.png" alt=""/>
                            <div>
                                <h4>Lhomme Aymeric</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <span className="las la-user-circle"/>
                            <span className="las la-comment"/>
                            <span className="las la-phone"/>
                        </div>
                    </div>
                    <div className={styles.customer}>
                        <div className={styles.info}>
                            <img src="/placeholder.png" alt=""/>
                            <div>
                                <h4>Lhomme Aymeric</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <span className="las la-user-circle"/>
                            <span className="las la-comment"/>
                            <span className="las la-phone"/>
                        </div>
                    </div>
                    <div className={styles.customer}>
                        <div className={styles.info}>
                            <img src="/placeholder.png" alt=""/>
                            <div>
                                <h4>Lhomme Aymeric</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <span className="las la-user-circle"/>
                            <span className="las la-comment"/>
                            <span className="las la-phone"/>
                        </div>
                    </div>
                    <div className={styles.customer}>
                        <div className={styles.info}>
                            <img src="/placeholder.png" alt=""/>
                            <div>
                                <h4>Lhomme Aymeric</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <span className="las la-user-circle"/>
                            <span className="las la-comment"/>
                            <span className="las la-phone"/>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}