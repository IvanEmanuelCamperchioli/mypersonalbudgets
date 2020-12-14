import React from 'react';
import {    
    Button, Modal, ModalHeader, ModalBody, 
    ModalFooter, FormGroup, Label, Input, Form
} from 'reactstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../styles/operations.css';
import routes from '../assets/routes'


class FormData extends React.Component {
    
    state = { 
        modal: false,
        type: "",
        concept: "",
        amount: 0,
        date: "",
        disabled: false
    }
    
    toggle = () => {
        this.setState({ 
            modal: !this.state.modal,
            disabled: false 
        });
    }

    getData = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name] : value
        }); 
    }

    notify = () => {
        toast.dark(
            <h4 className="toast-text">Datos registrados correctamente</h4>,
            {   
                transition: Zoom,
                position: toast.POSITION.BOTTOM_CENTER,
                hideProgressBar: true,
                delay: 500
            }
        );
    }

    toRegister = async e => {
        e.preventDefault()
        this.setState({ disabled: !this.state.disabled });

        // Easy verify
        const { type, concept, amount, date } = this.state
        if( type === '' || concept === '' || amount === 0 || date === '' ) {
            alert("Hay datos incompletos")
            this.setState({ disabled: false })
        } else {
            const registry = {
                type: this.state.type,
                concept: this.state.concept,
                amount: this.state.amount,
                date: this.state.date
            }

            // Send data through axios request
            await axios.post(`${routes}/api/registry`, registry)
            .then( async response => {
                if(response.data.success === true) {
                    await this.setState({ modal: !this.state.modal })
                    this.notify()
                    this.setState({
                        type: '', 
                        concept: '', 
                        amount: 0, 
                        date: '',
                    });
                    this.props.getRegistry()
                }  
            })
            .catch(error => {
                this.setState({
                    type: '', 
                    concept: '', 
                    amount: 0, 
                    date: '',
                    disabled: !this.state.disabled 
                });
                alert('Hubo un problema al intentar cargar los datos')
                this.toggle()
            });
        };
    }

    render() { 

        return ( 
            <>
                <div style={{ marginLeft: '2rem' }}>
                    <Button 
                        className="buttonForm" 
                        color="danger" 
                        onClick={this.toggle}
                    >   
                        <h6>cargar nueva operación</h6>
                    </Button>
                    <Modal 
                        isOpen={this.state.modal} 
                        toggle={this.toggle} 
                        className="modal-form"
                    >
                        <ModalHeader toggle={this.toggle}>Formulario de operaciones</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="type" className="label-form">Tipo</Label>
                                    <Input 
                                        type="select" 
                                        name="type" 
                                        onChange={this.getData}
                                    >
                                        <option>--Selecciona una operación--</option>
                                        <option name="Ingreso">Ingreso</option>
                                        <option name="Egreso">Egreso</option>
                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="concept" className="label-form">Concepto</Label>
                                    <Input 
                                        type="text" 
                                        name="concept" 
                                        autoComplete="off" 
                                        onChange={this.getData}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="amount" className="label-form">Monto</Label>
                                    <Input 
                                        type="number" 
                                        name="amount" 
                                        placeholder="$" 
                                        onChange={this.getData}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="date" className="label-form">Fecha</Label>
                                    <Input 
                                        type="date" 
                                        name="date" 
                                        onChange={this.getData} 
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                className="button-modal"
                                color="primary" 
                                disabled={this.state.disabled} 
                                onClick={this.toRegister}
                            >
                                Registrar
                            </Button>
                            <Button 
                                className="button-modal"
                                color="secondary" 
                                onClick={this.toggle}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <ToastContainer className="toast-container" />
                </div>
            </>
        );
    };
};
 
export default FormData;