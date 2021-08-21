
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

  //   componentDidMount() {
  //       this.retrieveCarsPost();
  //  }

  //  retrieveCarsPost() {
  //   CarPostDataService.getCarPost()
  //     .then(
  //       response => {
  //       this.setState({
  //           cars: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });

  // }
  
    render(){
        // const {cars}  = this.state;

        return(
              <div>
                <BasicTable/>
              </div>
        )
    }
  
}