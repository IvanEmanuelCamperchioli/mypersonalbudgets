import React, { useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/operations.css';
import route from '../assets/route'

const EditConcept = props => {

    const [toModify, setToModify] = useState(false)

    const [concept, setConcept] = useState("")

    const modify = () => {
        setToModify(true)
    }

    const captureEvent = e => {
        const value = e.target.value
        setConcept(value)
    }

    const notify = async () => {
        setToModify(false)
        await props.getRegistry()
        swal("Accion completada", "Concepto modificado correctamente", "success");        
    }

    const err = () => swal("Ocurrió un error", "no se pudo concretar la modificación", "error");

    const sendModification = async (id, data) => {
        const idToModify = id
        if(concept === "") {
            alert(`No se ha modificado el concepto ${data}`)
        } else {
            const response = await axios.put(`${route}/api/modify/${idToModify}`, { concept: concept })
            response.data.success === true ? notify() : err()    
            setConcept("")
        };
    }

    const cancel = () => setToModify(false)

    return (
            <td>
                {!toModify
                    ? <p>{props.data}</p>
                    : <FormGroup>
                        <Input
                            type="text"
                            name="concept"
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

export default EditConcept;