import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ErrorComponent({ error, resetErrorBoundary }) {
    return (
        <div>
            <h3>Opps! Something went wrong</h3>
            <div className="error">{error.message}</div>
            <strong>Lets try this again, shall we?</strong><br/>
            <button className="btn btn-info" onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

ErrorComponent.propTypes = {
    error: PropTypes.object,
    resetErrorBoundary: PropTypes.func.isRequired
}

export default ErrorComponent

