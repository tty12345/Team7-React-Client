
import {useTable, usePagination } from 'react-table'
import {COLUMNS} from './columns'
import React, { useState, useEffect } from "react";
import PostService from "../../Services/PostService";

export const BasicTable = () => {

    const [data1, setData] = useState([]);
    const [brand, setBrand] = useState("");
    const [priceLabel, setPriceLabel] = useState("");
    const [description, setDescription] = useState("");
    const [criteria, setCriteria] = useState(0);
    
    useEffect(() => { 
        getData()
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
        console.log(brand);
    }

    function onChangePriceLabel(e) {
        setPriceLabel(e.target.value);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeCriteria(e){
        setCriteria(e.target.value);
        if(e.target.value == 0){
            setBrand("");
            setPriceLabel("");
            setDescription("");
        }
    }

    function getData(){       

        var data = {
        criteria: criteria,
        brand: brand,
        price: priceLabel,
        description: description,
        userId: sessionStorage.getItem("userId")
    };
    console.log(data);
    PostService.search(data).then(response => {
        setData(response.data);
    })
    .catch(e => {
        console.log(e);
    });}
    
    return (
        <div>
            <div>
            <table>
                <select onChange = {onChangeCriteria}> 
                    <option value ="0" >All Cars</option>
                    <option value ="1" >Recommended</option>
                    <option value ="2">WishList</option>
                </select>
                <button onClick = {getData}>Get List</button>
            </table>
            </div>
        <br/>
            <div>
            {criteria == 0?(
                <table>
                    <tr>
                        <th><a2>Search Our Cars: </a2></th>
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
                </table>):(<div></div>)}
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