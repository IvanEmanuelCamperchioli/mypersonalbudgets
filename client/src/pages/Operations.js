import React from 'react';
import axios from 'axios';
import FormData from '../components/FormData';
import EntryTable from '../components/EntryTable';
import EgressTable from '../components/EgressTable';
import '../styles/operations.css';
const routes = require('../assets/routes');

class Operations extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.getRegistry()
        window.scrollTo(0, 0)
    }

    getRegistry = async () => {
        const response = await axios.get(`${routes.route}/api/registry`)
        const data = response.data.registry
        this.setState({ data })
    }
    
    render() { 

        return ( 
            <>
                <div style={{ marginTop: '20vh' }}>
                    <FormData getRegistry={this.getRegistry} />
                    <div className="table-main-container">
                        <EntryTable 
                            data={this.state.data} 
                            getRegistry={this.getRegistry} 
                        />
                        <EgressTable 
                            data={this.state.data} 
                            getRegistry={this.getRegistry} 
                        />
                    </div>
                </div>
            </>
        );
    };
};
 
export default Operations;