import React, { Fragment } from 'react'

function Loading({children, condition}) {
    const loadingComponent =  (()=> (<h4> Loading...</h4>))();
    return (
        <Fragment>
            {condition ? children : loadingComponent}
        </Fragment>
    )
}

export default Loading
