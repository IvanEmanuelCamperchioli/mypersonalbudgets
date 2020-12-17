import React from 'react';
import axios from 'axios';
import { Table, Spinner } from 'reactstrap';
import LastTen from '../components/LastTen';
import '../styles/home.css';
import route from '../assets/route'

class Home extends React.Component {

    state = {
        totalEntry: 0,
        totalEgress: 0,
        result: 0,
        lastTen: []
    }

    async componentDidMount() {
        await this.getRegistry()
        window.scrollTo(0, 0)
    }

    getRegistry = async () => {
        const response = await axios.get(`${route}/api/registry`)
        const data = response.data.registry
        this.separator(data)
        this.lastTen(data)
    }

    balance = (paramEntry, paramEgress) => {
        let totalEntry = 0
        let totalEgress = 0
        paramEntry.map( num => totalEntry += num);
        paramEgress.map( num => totalEgress += num);
        this.setState({ 
            totalEntry, 
            totalEgress,
            result: totalEntry - totalEgress
        });
    }
    
    separator = data => {
        let arrEntry = []
        let arrEgress = []
        data.map( data => {
            if(data.type === "Ingreso") {
                return arrEntry.push(data.amount) 
            } else {
                return arrEgress.push(data.amount)
            }; 
        });
        this.balance(arrEntry, arrEgress)
    }

    lastTen = async data => {
        const lastTen = await data.slice(-10).reverse()  
        this.setState({ lastTen })
    }

    render() { 

        if(this.state.result < 5000) {
            var style = { color: '#ec1818' }
        } else {
            style = { color: '#56ff91' }
        }

        return ( 
            <>  
            <div style={{ marginTop: '15vh' }}>
                <div className="table-container">
                    <h3>Balance actual</h3>
                    <hr className='row-line-balance' />
                    <Table dark className="balance">
                        <thead>
                            <tr>
                            <th></th>
                            <th><p>Ingresos</p></th>
                            <th><p>Gastos</p></th>
                            <th><p>Resultante</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tr-balance-table">
                            <th scope="row"></th>
                            <td>
                                { !this.state.totalEntry ? <Spinner color="info" /> : `$ ${this.state.totalEntry}` }
                            </td>
                            <td>
                                { !this.state.totalEgress ? <Spinner color="info" /> : `$ ${this.state.totalEgress}` }
                            </td>
                            <td style={style}>
                                { !this.state.result ? <Spinner color="info" /> : `$ ${this.state.result}` }
                            </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    <hr className='row-line' />
                    <div className="div-title">
                        <h3>Últimos registros</h3>
                    </div>
                   <LastTen lastTen={this.state.lastTen} />
                </div>
            </div>
            </>
        );
    };
};
 
export default Home;