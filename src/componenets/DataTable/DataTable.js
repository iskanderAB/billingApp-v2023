import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table ,Tag} from 'antd';

const DataTable = ({data , columns}) => {
    useEffect(()=> {
        console.log( "columns "  , columns);
        console.log( "data "  , data);
    },[data , columns])
    return (<div className='dataTable'>
                <Table
                    columns={columns}
                    dataSource={data.map(v=> {
                        if (v.type === 'Facture'){   
                            return {...v, TTC: +v.TTC+1 }
                        }
                        return v;
                    }) || []}
                    scroll={{y: 600 }}
                    pagination={{ position: ['bottomCenter']}}
                    size="large"
                   />
            </div>);
}
export default DataTable;
