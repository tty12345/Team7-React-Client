import React, { Component,useEffect } from "react";
import UserDataService from "../Services/UserService.js";
import '../App.css';
import PostService from "../Services/PostService.js";
import { Link, Redirect } from 'react-router-dom';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

export default class CarDetail extends Component {
    constructor(props) {
        super(props);
        this.getCar = this.getCar.bind(this);
        this.onChangeOffer = this.onChangeOffer.bind(this);
        this.submitNewOffer = this.submitNewOffer.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.likePost = this.likePost.bind(this);
        this.unLikePost = this.unLikePost.bind(this);
        this.checkLikeStatus = this.checkLikeStatus.bind(this);
        this.changeOfferStatus=this.changeOfferStatus.bind(this);
        this.sendToEdit=this.sendToEdit.bind(this);

        this.state = {
          car: null,
          id: props.match.params.id,
          offer: null,
          offerBefore: false,
          currentOffer: null,
          ownerId : -1,
          deleted : false,
          likeStatus: false,
          userId: sessionStorage.getItem("userId"),
          currentOfferStatus: false
        };

    }

    componentDidMount() {
        this.getCar();
        this.checkLikeStatus();
    }

    getCar() {
    this.checkOwnOffer();
    UserDataService.getCar(this.state.id)
      .then(
        response => {
        this.setState({
            car: response.data,
            ownerId : response.data.owner.userId
        });
    })}

    onChangeOffer(e) {
        this.setState({
            offer: e.target.value
          });
    }

    submitNewOffer() {
        if(!sessionStorage.getItem("status")){
            window.alert("Please Log In First To Leave Offer")
        }
        else{
            var data = {
                offer: this.state.offer,
                userId: this.state.userId
                
            };
            UserDataService.submitOffer(data, this.state.id)
            .then(response => {
                this.setState({
                    currentOffer: response.data,
                    currentOfferStatus: true
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    deletePost(){
        PostService.deletePost(this.state.id)
            .then(response => {
                if ( response.status == 204)
                    this.setState({
                        car : null,
                        deleted : true
                  }); 
            })
            .catch(e => {
                console.log(e);
            });
    }

    likePost(){
        var data = {
            userId: sessionStorage.getItem("userId")
          };
        PostService.likePost(data,this.state.id)
            .then(response => {
                if ( response.status == 200)
                    this.setState({
                        likeStatus: true
                  }); 
            })
            .catch(e => {
                console.log(e);
            });
    }

    checkLikeStatus(){
        var data = {
            userId: sessionStorage.getItem("userId")
          };
          PostService.checkLikeStatus(data,this.state.id)
            .then(response => {
                if (response.status == 200)
                    this.setState({
                        likeStatus: true
                    })
                else if(response == 203)
                    this.setState({
                        likeStatus: false
                    }); 
            })
            .catch(e => {
                console.log(e);
            });
    }

    unLikePost(){
        var data = {
            userId: sessionStorage.getItem("userId")
          };
        PostService.unLikePost(data,this.state.id)
            .then(response => {
                if ( response.status == 200)
                    this.setState({
                        likeStatus: false
                  }); 
            })
            .catch(e => {
                console.log(e);
            });
    }

    changeOfferStatus(){
        this.setState({
            currentOfferStatus: false
        })
    }

    checkOwnOffer(){
        var data = {
            userId: sessionStorage.getItem("userId")
          };
          UserDataService.checkOwnOffer(data,this.state.id)
            .then(response => {
                if(response.status == 200){
                this.setState({
                    currentOffer: response.data,
                    currentOfferStatus: true
                    })}
                else{
                this.setState({
                    currentOffer: response.data,
                    currentOfferStatus: false
                    })}; 
            })
            .catch(e => {
                console.log(e);
            });
    }

    sendToEdit(){
        sessionStorage.setItem("editPostItem",this.state.id);
        }
  
    render(){
        const {car,currentOffer,likeStatus, currentOfferStatus, id}  = this.state;
       
        return( 
            <div>
                { ( car ) ?  (
              <div>
                  
                  <br/>
                  <div className = "individualImage"><img src = {car.photoUrl} id = "carDetailImage"></img>
                  {sessionStorage.getItem("userId")?
                  (
                  <div>    
                  {likeStatus?
                  <img className ="base64Image" onClick = {this.unLikePost} src="https://image.flaticon.com/icons/png/128/2107/2107845.png"/>:
                  <img className ="base64Image" onClick = {this.likePost} src="https://image.flaticon.com/icons/png/128/1077/1077035.png"/>}</div>):
                  (<div></div>)}
                  </div>
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

                  {currentOfferStatus?
                  ( sessionStorage.getItem("userId") == this.state.ownerId ) ? 
                   (<div></div>) : 
                  (<div>
                      Your Offer: {currentOffer.offer} <button onClick={this.changeOfferStatus}>Edit</button>
                  </div>
                  ):(    ( sessionStorage.getItem("userId") == this.state.ownerId ) ?(
                     <div>
                     <button onClick={this.deletePost} className="btn btn-success" >Delete</button> 
                     <Link to="/CreatePost" className="btn btn-primary" onClick={this.sendToEdit}>Edit</Link></div>):           
                    <div align = "center">
                      <div className="form-group">
                      <label htmlFor="nickName">Offer</label>
                          <input
                          type="text"
                          className="form-control"
                          id="offer"
                          value={this.state.offer}
                          onChange={this.onChangeOffer}
                          name="offer"
                          />
                      </div>
                      <button onClick={this.submitNewOffer} className="btn btn-success" >Leave Offer</button>
                    </div> )}

              </div> ) : ( ( this.state.deleted ) ? <Redirect to='/ownpost' /> : <div></div> ) }
            </div>
        ) 
    }
}