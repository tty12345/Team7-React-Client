
import React, { Component } from "react";
import CarPostDataService from "../Services/CarPostService.js";
import { Link } from "react-router-dom";

export default class CarList extends Component {
    constructor(props) {
        super(props);
        this.retrieveCarsPost = this.retrieveCarsPost.bind(this);
        
    
        this.state = {
          cars: []
        };
      }

    componentDidMount() {
        this.retrieveCarsPost();
   }

   retrieveCarsPost() {
    CarPostDataService.getCarPost()
      .then(
        response => {
        this.setState({
            cars: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }
  
    render(){
        const {cars}  = this.state;

        return(
            <div>
                <ul className="list-group"
                >{cars &&
                    cars.map((car, index) => (
                      <li key={index}                      >
                        {car.description}
                      </li>
                    ))}
                </ul>
                <div>test</div>
            </div>
            
        )
    }
  
}