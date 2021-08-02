import React, { Fragment } from 'react'

function Loading({children, condition}) {
    const loadingComponent =  (()=> (<div> Loading Component</div>))();
    return (
        <Fragment>
            {condition ? children : loadingComponent}
        </Fragment>
    )
}

export default Loading
