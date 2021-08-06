import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.scss';

const PageTitle = ({ agents }) => {
    const history= useHistory();
    const currentRoute= useLocation().pathname.split('/'); 
    const entityName = (()=>{
        if(!currentRoute[1]) return 'DASHBOARD';
        else if(currentRoute[1] === 'agent') return `AGENT: ${agents[currentRoute[2]].firstName} ${agents[currentRoute[2]].lastName}`;
        else if(currentRoute[1] === 'call') {return `Number: ${currentRoute[2]}`;}
    })();

    return (
        <div className="page-title justify-center align-bottom position-relative">
            {currentRoute[1] && (
                <div className="position-absolute back-button ">
                    <i className="bi bi-arrow-left-circle-fill back-icon" onClick={history.goBack}></i>
                </div>
            )}
            <span > {entityName} </span>
        </div>
    )
}
 
export default PageTitle
