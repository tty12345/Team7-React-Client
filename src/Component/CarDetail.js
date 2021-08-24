import React, { Component,useEffect } from "react";
import UserDataService from "../Services/UserService.js";
import '../App.css';


export default class CarDetail extends Component {
    constructor(props) {
        super(props);
        this.getCar = this.getCar.bind(this);
        this.onChangeOffer = this.onChangeOffer.bind(this);
        this.submitNewOffer = this.submitNewOffer.bind(this);
        
    
        this.state = {
          car: null,
          id: props.match.params.id,
          offer: null,
          offerBefore: false,
          currentOffer: null
        };
    }

    componentDidMount() {
        this.getCar();
    }

    getCar() {
    UserDataService.getCar(this.state.id)
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
        this.setState({
            offer: e.target.value
          });
    }

    submitNewOffer() {
        if(!sessionStorage.getItem("state")){
            window.alert("Please Log In First To Leave Offer")
        }
        else{
            var data = {
                offer: this.state.offer,
            };
            console.log(data);
            UserDataService.submitOffer(data)
            .then(response => {
                this.setState({
                    currentOffer: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

  
    render(){
        const {car,currentOffer}  = this.state;
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
                  {currentOffer?(
                  <div>
                      Your Offer: {currentOffer.offer}
                  </div>
                  ):(                  
                    <div align = "center">
                      <div className="form-group">
                      <label htmlFor="nickName">Offer</label>
                          <input
                          type="text"
                          className="form-control"
                          id="offer"
                          // value={this.state.offer}
                          onChange={this.onChangeOffer}
                          name="offer"
                          />
                      </div>
                    <button onClick={this.submitNewOffer} className="btn btn-success" >Leave Offer</button>
                    </div>)}

              </div>
        )
        else
        return(
            <div>null</div>
        )
    }
  
}