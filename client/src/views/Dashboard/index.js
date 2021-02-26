import React, { useEffect } from 'react';
import Table from '../../components/Table/Table';
import Loader from '../../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAggregate } from '../../redux/actions';
import './dashboard.scss';


function Dashboard() {
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.aggregateData);
    const { loading, aggregateData } = data;

    const handleLink = (path) => {
        history.push(path);
    }

    const columns = [
        {
            field: 'number', headerName: 'Phone number', cellClassName: 'bookin-id', width: 250, renderCell: (params) => {
                return <span
                    onClick={() => handleLink(`/call/${params.value}`)}
                    style={{ cursor: 'pointer' }}
                    data-testid="number" 
                >
                    {params.value}
                </span>
            }
        },
        {
            field: 'count', headerName: 'Number of calls', width: 250, renderCell: (params) => {
                return <span

                >
                    {params.value} calls
                </span>
            }
        },
        {
            field: 'duration', headerName: 'Last call details', width: 200, renderCell: (params) => {
                let minutes = Math.floor(params.value / 60);
                let seconds = params.value - minutes * 60;

                return <span
                    onClick={() => handleLink(`/agent/${params.row.agent.identifier}`)}
                    style={{ cursor: 'pointer'}}
                >
                    {params.row.agent.firstName}  {params.row.agent.lastName}  / {minutes}:{seconds}
                </span>
            }
        },
    ];

    useEffect(() => {
        if (aggregateData && aggregateData.length === 0) {
            dispatch(getAggregate());
        }
       
    }, [dispatch]);

    return (
        <div className='dashboardContainer'>
            <div className='dashboard' data-testid="dashboard" >
                {loading ? <Loader /> : <Table rows={aggregateData} columns={columns} />}
            </div>
        </div>
    )
}

export default Dashboard;
