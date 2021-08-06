import React from 'react'
import MapComponent from '../../components/MapComponent';
import Table from '../../components/Table';
import { convetSecToTime, montlyCallLogs } from '../../utils';
import { useHistory } from 'react-router-dom';
import { MAP_AXIS, MAP_TITLE, TABLE_HEADINGS } from '../../utils/constants';

function Home({ logs, agents }) {

    const componentData = montlyCallLogs({ logs, agents })
    const history = useHistory();

    return (
        <div>
            <MapComponent data={componentData.mapData} axis={MAP_AXIS.HOME} title={MAP_TITLE.HOME} />
            <Table headings={TABLE_HEADINGS.HOME} >
                {
                    componentData.tableData &&
                    Object.values(componentData.tableData).map((val) => (
                        <tr key={val[0].number}>
                            <td><span onClick={() => history.push(`/call/${val[0].number}`)}>
                                {val[0].number}
                            </span></td>
                            <td>{val.length}</td>
                            <td>
                                <span onClick={() => history.push(`/agent/${val[0].agentIdentifier}`)}> {val[0].agentName} </span> / {`${convetSecToTime(val[0].duration)}`}
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </div>
    )
}

export default Home;
