
import React, { Component } from "react";
import CarPostDataService from "../Services/CarPostService.js";
import '../App.css';
import{BasicTable} from "./table/BasicTable"

export default class CarList extends Component {
    constructor(props) {
        super(props);
        // this.retrieveCarsPost = this.retrieveCarsPost.bind(this);

        
    
        // this.state = {
        //   cars: []
        // };
      }


  
    render(){
        // const {cars}  = this.state;

        return(
              <div>
                <BasicTable/>
              </div>
        )
    }
  
}