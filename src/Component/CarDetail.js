import React, { Component,useEffect } from "react";
import UserService from "../Services/UserService.js";
import '../App.css';

export default class CarList extends Component {
    constructor(props) {
        super(props);
        this.getCar = this.getCar.bind(this);
        this.onChangeOffer = this.onChangeOffer(this);

        
    
        this.state = {
          car: null,
          id: props.match.params.id,
          offer:{offer}
        };
      }

    componentDidMount() {
        this.getCar();
   }

   getCar() {
    UserService.getCar(this.state.id)
      .then(
        response => {
        this.setState({
            car: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });

  }


  onChangeOffer(e) {
    const offer = e.target.value;

    this.setState(function (prevState) {
        return {
            offer: {
                ...prevState.offer,
                marks: marks
            }
        };
    });
}
  
    render(){
        const {car}  = this.state;
        console.log(car);
        if(car!=null)
        return(
              <div>
                  <br/>
                  <div><img src = {car.photoUrl} id = "carDetailImage"></img></div>
                  <br/>
                  <table id = "cartable">
                  <tr>
                      <td><div id="attribute-type">Description:</div></td>
                      <td><div id="attribute-value">{car.description}</div></td>
                      <td><div id="attribute-type">Asking Price:</div></td>
                      <td><div id="attribute-value">{car.price}</div></td>
                  </tr>
                  <tr>
                      <td><div id="attribute-type">Brand:</div></td>
                      <td><div >{car.brand}</div></td>
                      <td><div id="attribute-type">Engine Capacity:</div></td>
                      <td><div>{car.engineCapacity}</div></td>
                  </tr>
                  <tr>
                      <td><div id="attribute-type">Registration Date:</div></td>
                      <td><div id="attribute-value">{car.registeredDate}</div></td>
                      <td><div id="attribute-type">Engine Capacity:</div></td>
                      <td><div id="attribute-value">{car.engineCapacity}</div></td>
                  </tr>
                  <tr>
                      <td><div id="attribute-type">Mileage:</div></td>
                      <td><div id="attribute-value">{car.mileage}</div></td>
                      <td><div id="attribute-type">Category:</div></td>
                      <td><div id="attribute-value">{car.category}</div></td>
                  </tr>
                  </table>
                  <br/>
                  <div align = "center">
                  <button align = "center" >Leave Offer</button>
                  </div>
              </div>
        )
        else
        return(
            <div>null</div>
        )
    }
  
}