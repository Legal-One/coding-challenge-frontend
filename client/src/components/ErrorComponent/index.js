import React from 'react';
import './styles.scss';

function ErrorComponent({ error, resetErrorBoundary }) {
    return (
        <div>
            <h3>Opps! Something went wrong</h3>
            <div className="error">{error.message}</div>
            <strong>Lets try this again, shall we?</strong><br/>
            <button className="btn btn-info" onClick={resetErrorBoundary}>Try again</button>

            <div>
                
            </div>
        </div>
    )
}

ErrorComponent.propTypes = {

}

export default ErrorComponent

