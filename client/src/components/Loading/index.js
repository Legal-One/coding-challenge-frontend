import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Loading({children, condition}) {
    const loadingComponent =  (()=> (<h4> Loading...</h4>))();
    return (
        <Fragment>
            {condition ? children : loadingComponent}
        </Fragment>
    )
}

Loading.propTypes = {
    children: PropTypes.node,
    condition: PropTypes.bool
}

export default Loading
