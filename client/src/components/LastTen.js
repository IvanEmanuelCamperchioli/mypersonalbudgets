import React from 'react';
import { Table, Spinner } from 'reactstrap';
import '../styles/home.css';

const LastTen = props => {

    return ( 

        <div className="div-table-home">
            <div className="table-last-ten">
                <Table hover>
                    <thead className="thead-list">
                        <tr>
                            <th></th>
                            <th><p>Fecha</p></th>
                            <th><p>Tipo</p></th>
                            <th><p>Concepto</p></th>
                            <th><p>Monto</p></th>
                        </tr>
                    </thead>
                    { props.lastTen.length === 0 
                        ? <Spinner color="info" className="spinner-list" />  
                        : props.lastTen.map(data => {
                            return (
                                <tbody className="tbody-last-ten">
                                    <tr>
                                        <th scope="row"></th>
                                        <td><p>{data.date}</p></td>
                                        <td><p>{data.type}</p></td>
                                        <td><p>{data.concept}</p></td>
                                        <td><p>$ {data.amount}</p></td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </Table>
            </div>
        </div>
     );
};
 
export default LastTen;