
import {useTable, usePagination } from 'react-table'
import {COLUMNS} from './columns'
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostService from "../../Services/PostService";

export const PrefCarsTable = () => {

    const [data1, setData] = useState([]);
    const [brand, setBrand] = useState("");
    const [priceLabel, setPriceLabel] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(() => { getData() }, []);

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

    // this.state={ userId: sessionStorage.getItem("userId")};

    function getData(){        
        var data = {
        //postId: this.state.postId,
        brand: brand,
        priceLabel: priceLabel,
        description: description,
        // userId:sessionStorage.getItem("userId")
        

    };
    PostService.searchByPref(sessionStorage.getItem("userId"),data).then(response => {
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
                            <option value='Audi'>Audi</option>
                                <option value='Austin'>Austin</option>
                                <option value='BMW'>BMW</option>
                                <option value='Citron'>Citron</option>
                                <option value='Ferrari'>Ferrari</option>
                                <option value='Fiat'>Fiat</option>
                                <option value='Honda'>Honda</option>
                                <option value='Hyundai'>Hyundai</option>
                                <option value='Kia'>Kia</option>
                                <option value='Lexus'>Lexus</option>
                                <option value='Mini'>Mini</option>
                                <option value='Mercedes-Benz'>Mercedes-Benz</option>
                                <option value='Mitsubishi'>Mitsubishi</option>
                                <option value='Morris'>Morris</option>
                                <option value='Nissan'>Nissan</option>
                                <option value='Opel'>Opel</option>
                                <option value='Peugeot'>Peugeot</option>
                                <option value='Porsche'>Porsche</option>
                                <option value='Renault'>Renault</option>
                                <option value='Subaru'>Subaru</option>
                                <option value='Suzuki'>Suzuki</option>
                                <option value='Toyota'>Toyota</option>
                                <option value='Volkswagen'>Volkswagen</option>
                                <option value='Volvo'>Volvo</option>
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