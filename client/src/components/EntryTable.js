import React from 'react';
import { Table, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import axios from 'axios';
import routes from '../assets/routes';
import EditConcept from './EditConcept';
import EditAmount from './EditAmount';
import '../styles/operations.css';

const EntryTable = props => {

    const alertswal = id => {
        swal({
            title: "¿Eliminar del registro?",
            text: "No podrá recuperar los datos una ves realizada la acción!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove(id)
                    swal("Los datos fueron eliminados correctamente", {
                        icon: "success",
                    });

                } else {
                    swal("Sus datos fueron conservados");
                };
            });
    }

    const remove = async id => {
        const idToRemove = id
        const response = await axios.delete(`${routes.route}/api/registry/${idToRemove}`)
        if (response.data.success) props.getRegistry();
    }


    return (

        <div className="div-entry-table">
            <Table dark>
                <thead>
                    <tr>
                        <th></th>
                        <th><p>Fecha</p></th>
                        <th><p>Tipo</p></th>
                        <th><p>Concepto</p></th>
                        <th><p>Monto</p></th>
                    </tr>
                </thead>
                {props.data.length === 0
                    ? <Spinner color="info" className="spinner-table" />
                    : props.data.map(data => {
                        if (data.type === "Ingreso") {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <button
                                                className="button-remove"
                                                onClick={() => alertswal(data._id)}
                                            >
                                                <FontAwesomeIcon
                                                    className="icon"
                                                    icon={faTrash}
                                                />
                                            </button>
                                        </th>
                                        <td><p>{data.date}</p></td>
                                        <td><p>{data.type}</p></td>
                                        <EditConcept
                                            getRegistry={props.getRegistry}
                                            id={data._id}
                                            data={data.concept}
                                        />
                                        <EditAmount
                                            getRegistry={props.getRegistry}
                                            id={data._id}
                                            data={data.amount}
                                        />
                                    </tr>
                                </tbody>
                            )
                        } else return null
                    })
                }
            </Table>
        </div>
    );
};

export default EntryTable;
