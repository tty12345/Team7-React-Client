
import {useTable, usePagination } from 'react-table'
import {COLUMNS} from './NotificationColumn'
import axios from "axios";
import React, { useState, useEffect } from "react";
import UserService from "../../Services/UserService";

export const NotificationTable = () => {

    const [data1, setData] = useState([]);


    useEffect(() => { getData() }, []);

    const tableInstance = useTable({
        columns: COLUMNS,
        data: data1
    },
    usePagination)

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow} = tableInstance


    function getData(){        
        UserService.getNotification(sessionStorage.getItem("userId")).then(response => {
            setData(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }    
    
    return (
    <div>
    <div>
    <table {...getTableProps()} id = "cartable">
        <thead>
            {
                headerGroups.map((headerGroups)=>(
                <tr {...headerGroups.getHeaderGroupProps()}>
                    {
                        headerGroups.headers.map((column)=>(
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                </tr>
                ))}
        </thead>
        <tbody{...getTableBodyProps()}>
            {
                page.map(row=>{
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map(cell =>{
                                return <td{...cell.getCellProps}>{cell.render("Cell")}</td>
                            })
                        }
                    </tr>
                    )
                })
            }
        </tbody>
    </table>
    </div>
    </div>
    )
}