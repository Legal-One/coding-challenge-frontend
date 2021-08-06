import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { getData } from '../api';
import Loading from '../components/Loading';
import Agent from '../screens/Agent';
import Home from '../screens/Home';
import CallComponent from '../screens/Call';
import { indentifierObjectFromArray } from '../utils';
import PageTitle from '../components/PageTitle';

function Navigation() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getData().then(res => {
            setLoading(false);

            setData({
                logs: indentifierObjectFromArray(res.logs),
                agents: indentifierObjectFromArray(res.agent),
                resolution: indentifierObjectFromArray(res.resolution),
            });
        }).catch(err => { setLoading(false); setData(err) });
    }, []);

    return (
        <Loading condition={!loading}>
            {data && (
                <BrowserRouter>
                    <PageTitle calls={data.logs} agents={data.agents} />
                    <Switch>
                        <Route exact path="/">
                            <Home logs={Object.values(data.logs)} agents={data.agents} />
                        </Route>
                        <Route exact path="/agent/:agentId">
                            <Agent logs={Object.values(data.logs)} agents={data.agents} resolution={data.resolution} />
                        </Route>
                        <Route exact path="/call/:agentId">
                            <CallComponent logs={Object.values(data.logs)} agents={data.agents} resolution={data.resolution} />
                        </Route>
                    </Switch>
                </BrowserRouter>
            )}
        </Loading>
    )
}


export default Navigation;
