import React, { Component } from "react";
import '../App.css';
import{OwnPostsTable} from "./table/OwnPostsTable"

export default class CarList extends Component {

  
    render(){
        return(
              <div>
                <OwnPostsTable/>
              </div>
        )
    }
  
}