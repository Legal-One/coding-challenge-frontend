import React, { useEffect } from 'react';
import Table from '../../components/Table/Table';
import Loader from '../../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAgent } from '../../redux/actions';
import { FaHandPointLeft } from "react-icons/fa";
import { IconContext } from "react-icons";

import './viewagent.scss';

function ViewAgent() {
    let { ID } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.agentData);
    const { loading, agentData } = data;

    const columns = [
        {
            field: 'number', headerName: 'Phone number', cellClassName: 'bookin-id', width: 250, renderCell: (params) => {
                return <span
                >
                    {params.value}
                </span>
            }
        },
        {
            field: 'dateTime', headerName: 'Call date and time', width: 250, renderCell: (params) => {
                return <span

                >
                    {new Date(params.value).toLocaleDateString()} {new Date(params.value).toLocaleTimeString()}
                </span>
            }
        },
        {
            field: 'resolutions', headerName: 'Resolution', width: 200, renderCell: (params) => {
                return <span
                >
                    {params.row.resolution.resolution}
                </span>
            }
        },
    ];

    useEffect(() => {
        dispatch(getAgent(ID));
    }, [dispatch, ID]);

    return (
        <div className='dashboardContainer'>

            <div className='dashboard' data-testid="view-agent" >
                {loading ? <Loader /> : <div>
                    <IconContext.Provider value={{ color: "black", size: "40" }}>
                        <div className='icon'>
                            <FaHandPointLeft onClick={() => history.push('/') }/>
                        </div>
                    </IconContext.Provider>
                    
                    <Table rows={agentData} columns={columns} />
                </div>}
            </div>
        </div>
    )
}

export default ViewAgent;
