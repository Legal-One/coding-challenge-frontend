import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function DataGridDemo(props) {
    const { columns, rows } = props;
    return (
        <div style={{ height: 700, width: '100%' }} data-testid="table">
            <DataGrid searchPlaceholder={'Search..'} rows={rows} columns={columns} pageSize={10} checkboxSelection={false} search={true} />
        </div>
    );
}