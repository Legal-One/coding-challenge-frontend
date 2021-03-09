import React from 'react'
import { useSelector } from 'react-redux'
import { selectCallDetails } from '../../features/callcenter/callcenter-slice'
import TableRow from './call-statistics-table-row'
import TableHeader from './table-header'

function Table({ children }: { children: React.ReactNode }) {
  const callStats = useSelector(selectCallDetails)
  return (
    <div className="mb-6">
      <h1 className="is-size-2 has-text-weight-bold has-text-centered pt-2 pb-2">
        Call Statistics
      </h1>
      <div className="card table">{children}</div>
    </div>
  )
}

export default Table
