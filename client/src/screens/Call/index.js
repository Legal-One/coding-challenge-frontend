import React from 'react'
import PropTypes from 'prop-types';
import MapComponent from '../../components/MapComponent';
import Table from '../../components/Table';
import { numberCallLogs } from '../../utils';
import { useHistory, useLocation } from 'react-router-dom';
import { MAP_AXIS, MAP_TITLE, TABLE_HEADINGS } from '../../utils/constants';

function CallComponent({ logs, agents, resolution }) {
    const history = useHistory();
    const location = useLocation();
    const number = location.pathname.split('/')[2];
    const calculatedData = numberCallLogs({
        calls: logs.filter(log => log.number === number),
        agents: agents,
        resolution
    });

    return (
        <div>
            <MapComponent data={calculatedData.mapData} axis={MAP_AXIS.CALL} mapType='CALL' title={MAP_TITLE.CALL} />
                <Table headings={TABLE_HEADINGS.CALL} >
                    {
                        calculatedData.tableData.map((call, index) => (
                            <tr key={call.identifier}>
                                <td><span onClick={() => history.push(`/agent/${call.agentIdentifier}`)}>
                                    {call.agent}
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

CallComponent.propTypes = {
    logs:PropTypes.arrayOf(PropTypes.object),
    agents:PropTypes.object,
    resolution:PropTypes.object,
};

export default CallComponent;
