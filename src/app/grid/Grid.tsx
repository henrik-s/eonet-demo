import * as React from 'react';
import _ from 'underscore';
import classnames from 'classnames';

import {AgGridReact} from 'ag-grid-react';
import {RowSelectedEvent} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import styles from './style.sass';

import {
    eonet,
    utils,
} from '@/api';

const gridConfiguration = {
    columnDefs: [
        {
            headerName: 'Date',
            valueGetter: (params: any) => utils.getEventDate(params.data),
            valueFormatter: (params: any) => {
                return params.value.toLocaleString();
            },
        },
        {
            headerName: 'Title',
            field: eonet.EventFields.Title,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Category',
            valueGetter: (params: any) => utils.getCategoryLabel(params.data),
        },
        {
            headerName: 'Status',
            valueGetter: (params: any) => {
                if (params.data.closed != null) return 'Closed';

                return 'Open';
            },
            cellClass: (params: any) => params.value.toLowerCase(),
        },
    ],
    defaultColDef: {
        sortable: true,
        resizable: true,
        filter: false,
        flex: 1,
        minWidth: 100,
        filterParams: {
            applyButton: true,
            resetButton: true,
        },
    },
};


interface Props {
    rowData: Array<eonet.Event>
    rowSelected: (event: RowSelectedEvent) => void
}

const Grid = (props: Props) => {
    return (
        <div className={classnames(styles.container, 'ag-theme-alpine-dark')}>
            <AgGridReact
                columnDefs={gridConfiguration.columnDefs}
                rowData={props.rowData}
                onRowSelected={props.rowSelected}
                rowSelection='single'
                pagination={true}
                paginationAutoPageSize={true}
                defaultColDef={gridConfiguration.defaultColDef}
            />
        </div>
    );
};

export const Component = Grid;
