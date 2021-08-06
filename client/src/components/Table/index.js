import React from 'react'
import PropTypes from 'prop-types';

function Table({ headings, children }) {
    return (
        <div>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        {headings.map(heading =><th key={heading} scope="col">{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
}

export default Table
