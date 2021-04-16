import React from 'react';
import Table from 'components/Table/Table';
import Card from 'components/Cards/Card/Card';
import Status from 'components/Status/Status';

export default function RecentOrders({ orders }) {
    const labels = [
        {
            id: 'customer', defaultMessage: 'Customer',
        },
        {
            id: 'date', defaultMessage: 'Date',
        },
        {
            id: 'status', defaultMessage: 'Status',
        },
    ];

    return (
        <>

            <div className='orders'>
                <Card
                    title='Recent Order'
                    color='teal'
                >
                    <Card.Header title='Recent Order' />
                    <Card.Body>
                        <Table labels={labels}>
                            <tr>
                                <td>Chevalier Théo</td>
                                <td>05/04/2021</td>
                                <td>
                                    <Status state='pending' />
                                </td>
                            </tr>
                            <tr>
                                <td>Chevalier Théo</td>
                                <td>05/04/2021</td>
                                <td>
                                    <Status state='pending' />
                                </td>
                            </tr>
                            <tr>
                                <td>Chevalier Théo</td>
                                <td>05/04/2021</td>
                                <td>
                                    <Status state='pending' />
                                </td>
                            </tr>
                            <tr>
                                <td>Chevalier Théo</td>
                                <td>05/04/2021</td>
                                <td>
                                    <Status state='pending' />
                                </td>
                            </tr>
                            <tr>
                                <td>Chevalier Théo</td>
                                <td>05/04/2021</td>
                                <td>
                                    <Status state='pending' />
                                </td>
                            </tr>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
