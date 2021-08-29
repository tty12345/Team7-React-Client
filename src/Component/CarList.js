
import React, { Component } from "react";
import '../App.css';
import{BasicTable} from "./table/BasicTable"


export default class CarList extends Component {

  
    render(){
        return(
          <div>
            <br/>
          <div></div>
              <div className = "table-heading">
                <BasicTable/>
              </div>
          </div>
        )
    }
  
}