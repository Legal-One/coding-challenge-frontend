import React, { useEffect } from 'react';
import Table from '../../components/Table/Table';
import Loader from '../../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaHandPointLeft } from "react-icons/fa";
import { IconContext } from "react-icons";
import { getNumber } from '../../redux/actions';
import './viewnumber.scss';

function ViewNumber() {
    let { number } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.numberData);
    const { loading, numberData } = data;

    const columns = [
        {
            field: 'agent', headerName: 'Agent Name', width: 250, renderCell: (params) => {
                return <span
                >
                    {params.row.agent.firstName} {params.row.agent.lastName}
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
        dispatch(getNumber(number));
    }, [dispatch, number]);

    return (
        <div className='dashboardContainer'>
            <div className='dashboard'>
                {loading ? <Loader /> : <div>
                    <IconContext.Provider value={{ color: "black", size: "40" }}>
                        <div className='icon'>
                            <FaHandPointLeft onClick={() => history.push('/')} />
                        </div>
                    </IconContext.Provider>
                    <Table rows={numberData} columns={columns} />
                </div>}
            </div>
        </div>
    )
}

export default ViewNumber;
