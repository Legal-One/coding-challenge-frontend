import React from 'react'
import MapComponent from '../../components/MapComponent';
import Table from '../../components/Table';
import { agentCallLogs } from '../../utils';
import { useHistory, useLocation } from 'react-router-dom';
import { MAP_AXIS, MAP_TITLE, TABLE_HEADINGS } from '../../utils/constants';

function Agent({ logs, agents, resolution }) {
    const history = useHistory();
    const location = useLocation();
    const agentId = location.pathname.split('/')[2];
    const calculatedData = agentCallLogs({ calls: logs.filter(log => log.agentIdentifier === agentId), agent: agents[agentId], resolution });

    return (
        <div>
            <MapComponent data={calculatedData.mapData} axis={MAP_AXIS.AGENT} title={MAP_TITLE.AGENT}/>
            <Table headings={TABLE_HEADINGS.AGENT} >
                {
                    calculatedData.tableData.map((call, index) => (
                        <tr key={call.identifier}>
                            <td><span onClick={() => history.push(`/call/${call.number}`)}>
                                {call.number}
                            </span></td>
                            <td>{call.date} {call.time}</td>
                            <td>{call.resolution}</td>
                        </tr>
                    ))
                }
            </Table>
        </div>
    )
}

export default Agent;
