import React from 'react';
import './loader.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loader() {
    return (
        <div className='loader' data-testid="loader">
            <CircularProgress />
        </div>
    )
}

export default Loader
