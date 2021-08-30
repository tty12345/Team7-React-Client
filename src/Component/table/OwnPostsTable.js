
import { useTable, usePagination } from 'react-table'
import { OWNPOSTCOLUMNS } from './OwnPostsColumn'
import React, { useState, useEffect } from "react";
import CarPostDataService from "../../Services/PostService";

export const OwnPostsTable = () => {

    const [data1, setData] = useState([]);
    
    useEffect(() => { getOwnPosts() }, []);

    const tableInstance = useTable({
        columns: OWNPOSTCOLUMNS,
        data: data1
    },
    usePagination)

    const { getTableProps, getTableBodyProps, headerGroups, page,nextPage,
        previousPage,canPreviousPage,canNextPage,pageOptions,state, prepareRow,setPageSize} = tableInstance

    const {pageIndex, pageSize} = state

    function getOwnPosts(){        
        CarPostDataService.getOwnCars(sessionStorage.getItem("userId"))
        .then(response => {
            setData(response.data);
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
            <div className = "page-control" align ="center">
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