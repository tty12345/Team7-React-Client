
import React, { Component } from "react";
import CarPostingDataService from "../Services/CarPostService.js";

export default class CarList extends Component {
    constructor(props) {
        super(props);
        this.retrieveCars = this.retrieveCars.bind(this);
        
    
        this.state = {
          cars: [],
        };
      }

    componentDidMount() {
        console.log("TESTING")
        this.retrieveCars();
   }

   retrieveCars() {
    CarPostingDataService.getCars()
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
        const cars  = this.state;

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