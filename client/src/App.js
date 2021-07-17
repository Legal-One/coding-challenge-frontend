import React, {useEffect, useState} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './views/home/Home';
import Agent from './views/agent/Agent';
import Call from './views/call/Call';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Navbar';
import axios from "axios";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({agents: [], logs: [], resolution: []});
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const logsJson = await axios.get(`/logs`);
                const resolutionJson = await axios.get(`/resolution`);
                const agentsJson = await axios.get(`/agents`);
                setData({
                    agents: agentsJson.data,
                    logs: logsJson.data,
                    resolution: resolutionJson.data
                });
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                error.response && setErrorMsg(error.response.data);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

  return (
    <div className="App">
        <Router>
            <Header />
            { errorMsg && <p>errorMsg</p> }
            <Switch>
                <Route exact path='/'>
                    <Home data={data} />
                </Route>
                <Route exact path='/agent/:id'>
                    <Agent data={data} />
                </Route>
                <Route exact path='/call/:number'>
                    <Call data={data} />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
