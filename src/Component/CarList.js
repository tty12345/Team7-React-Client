
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
          <table>
             <thead>
                  <th>Id</th>
                  <th >Price</th>
                  <th >Description</th>
                  <th >Brand</th>
                  <th >Engine Capacity</th>
                  <th >Registration Date</th>
                  <th >Mileage</th>
                  <th >Category</th>
                  <th >Image</th>
		          </thead>
              <tbody>
                    {cars &&
                    cars.map((car, index) => (
                  <tr key={index}>
                        <td>{car.postId}</td>
                        <td>{car.price}</td>
                        <td>{car.description}</td>
                        <td>{car.brand}</td>
                        <td>{car.engineCapacity}</td>
                        <td>{car.registeredDate}</td>
                        <td>{car.mileage}</td>
                        <td>{car.category}</td>
                        <td><img src={car.photoUrl}></img></td>
                  </tr>
                    ))}
              </tbody>
          </table>
        </div>
        )
    }
  
}