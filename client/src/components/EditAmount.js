import React, { useState } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/operations.css';
import route from '../assets/route'

const EditAmount = props => {

    const [toModify, setToModify] = useState(false)

    const [amount, setAmount] = useState(0)

    const modify = () => {
        setToModify(true)
    }

    const captureEvent = e => {
        const value = e.target.value
        setAmount(value)
    }

    const notify = async () => {
        setToModify(false)
        await props.getRegistry()
        swal("Accion completada", "Monto modificado correctamente", "success");
    }

    const err = () => swal("Ocurrió un error", "no se pudo concretar la modificación", "error");

    const sendModification = async (id, data) => {
        const idToModify = id
        if(amount === 0) {
            alert(`No se ha modificado el monto ${data}`)
        } else {
            const response = await axios.put(`${route}/api/modify/${idToModify}`, { amount: amount })
            response.data.success === true ? notify() : err()   
            setAmount(0) 
        };
    }

    const cancel = () => setToModify(false)

    return (
        <td>
            {!toModify
                ? <p>$ {props.data}</p>
                : <FormGroup>
                    <Input
                        type="text"
                        name="amount"
                        autoComplete="off"
                        onChange={captureEvent}
                        defaultValue={props.data}
                    />
                    <div className="modify">
                        <Button onClick={() => sendModification(props.id, props.data)}>
                            Modificar
                        </Button>
                        <Button onClick={cancel} >
                            Cancelar
                        </Button>
                    </div>
                </FormGroup>
            }
            <FontAwesomeIcon
                className="icon"
                icon={faEdit}
                onClick={modify}
            />
        </td>
    );
};

export default EditAmount;