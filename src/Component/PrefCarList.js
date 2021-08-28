
import React, { Component } from "react";
import CarPostDataService from "../Services/CarPostService.js";
import '../App.css';
import{PrefCarsTable} from "./table/PrefCarsTable"

export default class PrefCarList extends Component {
    constructor(props) {
        super(props);
  
      }


  
    render(){
        return(
              <div>
                <PrefCarsTable/>
              </div>
        )
    }
  
}