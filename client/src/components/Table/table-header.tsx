import React from 'react'

function TableHeader({ headers }: { headers: Array<string> }) {
  return (
    <div className="columns">
      {headers.map((header) => (
        <div key={header} className="column has-text-weight-bold">
          {header}
        </div>
      ))}
    </div>
  )
}
export default TableHeader
