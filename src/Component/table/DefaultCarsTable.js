import { useTable, usePagination } from 'react-table'
import { OWNPOSTCOLUMNS } from './OwnPostsColumn'
import React, { useState, useEffect } from "react";
import CarPostDataService from "../../Services/CarPostService";

export const DefaultCarsTable = () => {

    const [data1, setData] = useState([]);
    
    useEffect(() => { getmostviewed() }, []);

    const tableInstance = useTable({
        columns: OWNPOSTCOLUMNS,
        data: data1
    },
    usePagination);

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = tableInstance

    function getmostviewed(){        
        CarPostDataService.getTopCars()
        .then(response => {
            setData(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    return (
        <div>
            <br />
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