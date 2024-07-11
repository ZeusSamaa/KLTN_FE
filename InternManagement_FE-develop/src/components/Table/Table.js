// import { Delete, Edit } from '@mui/icons-material';
// import { Box, IconButton, Tooltip } from '@mui/material';
// import { MaterialReactTable } from 'material-react-table'; 
import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

export default function Table({ 
    columns = [], 
    data = [], 
    setData = () => {},
    isLoading = false,
    tableParams,
    setTableParams
}) {

    let _columns  = [];
    if (columns.length == 0) {
        _columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              sorter: true,
              render: (name) => `${name.first} ${name.last}`,
              width: '20%',
            },
            {
              title: 'Gender',
              dataIndex: 'gender',
              filters: [
                {
                  text: 'Male',
                  value: 'male',
                },
                {
                  text: 'Female',
                  value: 'female',
                },
              ],
              width: '20%',
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
        ];
    }
   
    function handleTableChange(pagination, filters, sorter) {
        setTableParams({
            pagination,
            filters,
        ...sorter,
        });
    
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    }

    return (
        <Table 
            loading={isLoading}
            bordered 
            columns={columns} 
            dataSource={data}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
        />
    )
}