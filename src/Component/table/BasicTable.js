
import {useTable, usePagination } from 'react-table'
import {COLUMNS} from './columns'
import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";

export const BasicTable = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
          await axios
            .get("http://localhost:8080/post/listPost2")
            .then((response) => {
              // check if the data is populated
              console.log(response.data);
              setData(response.data);
              // you tell it that you had the result
              setLoadingData(false);
            });
        }
        if (loadingData) {
          // if the result is not ready so you make the axios call
          getData();
        }
      }, []);


    const tableInstance = useTable({
        columns: COLUMNS,
        data: data
    },
    usePagination)

    const { getTableProps, getTableBodyProps, headerGroups, page,nextPage,
        previousPage,canPreviousPage,canNextPage,pageOptions,state, prepareRow,setPageSize} = tableInstance

    const {pageIndex, pageSize} = state

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
    <div align ="center">
    <select value={pageSize} onChange = {e=> setPageSize(Number(e.target.value))}>
            {
                [5,10,50,100].map(pageSize => (
                    <option key = {pageSize} value = {pageSize}>Show {pageSize}</option>
                ))
            }
    </select>
    <button onClick={() =>previousPage()} disabled ={!canPreviousPage}>Previous</button>
    <span>
        Page {' '}
        <strong>
            {pageIndex +1} of {pageOptions.length}
        </strong>{' '}
    </span>
        <button onClick={() =>nextPage()} disabled ={!canNextPage}>Next</button>
    </div>
    </div>
    )
}