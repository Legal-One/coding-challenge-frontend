import React from 'react'

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

export default Table
