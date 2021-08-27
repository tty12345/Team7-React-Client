
import {useTable, usePagination } from 'react-table'
import {COLUMNS} from './columns'
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostService from "../../Services/PostService";

export const BasicTable = () => {

    const [data1, setData] = useState([]);
    const [brand, setBrand] = useState("");
    const [priceLabel, setPriceLabel] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(async() => { 
        await getData() 

    }, []);

    const tableInstance = useTable({
        columns: COLUMNS,
        data: data1
    },
    usePagination)

    const { getTableProps, getTableBodyProps, headerGroups, page,nextPage,
        previousPage,canPreviousPage,canNextPage,pageOptions,state, prepareRow,setPageSize} = tableInstance

    const {pageIndex, pageSize} = state

    function onChangeBrand(e) {
        setBrand(e.target.value);
    }

    function onChangePriceLabel(e) {
        setPriceLabel(e.target.value);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function getData(){        
        var data = {
        //postId: this.state.postId,
        brand: brand,
        priceLabel: priceLabel,
        description: description
    };
    PostService.search(data).then(response => {
        setData(response.data);
    })
    .catch(e => {
        console.log(e);
    });}
    
    return (
        <div>
        <br/>
            <div>
                <table>
                    <tr>
                        <th>Brand<select name = "brand" onChange = {onChangeBrand}>
                            <option></option>
                            <option value = "toyota">Toyota</option>
                            <option value = "honda">Honda</option>
                            <option value = "Mercedes-Benz">Mercedes</option>
                            <option value = "porsche">Porsche</option>
                            <option value = "mazda">Mazda</option>
                            <option value = "suzuki">Suzuki</option>
                            <option value = "others">Others</option>
                        </select></th>
                        <th>Price<select name = "priceLabel" onChange = {onChangePriceLabel}>
                            <option></option>
                            <option value = "0">$0 to $50,000</option>
                            <option value = "1">$50,001 to $100,000</option>
                            <option value = "2">$100,001 to $150,000</option>
                            <option value = "3">$150,000 and above</option>
                        </select></th>
                        <th>Model<input type="text" name = "description" onChange = {onChangeDescription}/></th>
                        <th><input type="submit" value = "Submit" onClick={getData}/></th>
                    </tr>
                </table>
            </div>
            <br/>
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