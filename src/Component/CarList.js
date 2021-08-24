
import React, { Component } from "react";
import CarPostDataService from "../Services/CarPostService.js";
import '../App.css';
import{BasicTable} from "./table/BasicTable"

export default class CarList extends Component {
    constructor(props) {
        super(props);
      }


  
    render(){
        return(
              <div>
                <BasicTable/>
              </div>
        )
    }
  
}