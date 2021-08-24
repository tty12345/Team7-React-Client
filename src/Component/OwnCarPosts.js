import React, { Component } from "react";
import '../App.css';
import{OwnPostsTable} from "./table/OwnPostsTable"

export default class CarList extends Component {
    constructor(props) {
        super(props);
      }


  
    render(){
        return(
              <div>
                <OwnPostsTable/>
              </div>
        )
    }
  
}