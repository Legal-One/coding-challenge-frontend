import React from 'react'
import PropTypes from 'prop-types'

import { DataGrid } from '@material-ui/data-grid'

function Table({ header, data }) {
  return (
    <div
      style={{ width: '100%', minHeight: '400px', height: '400px' }}
      data-testid="table"
    >
      <DataGrid
        searchPlaceholder={'Search'}
        rows={data}
        columns={header}
        pageSize={5}
        disableSelectionOnClick
        disableColumnResize
        disableColumnMenu
      />
    </div>
  )
}

Table.prototype = {
  header: PropTypes.arrayOf(Object).isRequired,
  data: PropTypes.arrayOf(Object)
}

export default Table
