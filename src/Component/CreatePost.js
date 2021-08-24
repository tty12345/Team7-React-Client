import React, { Component } from "react";
import PostService from "../Services/PostService";
import { Redirect } from 'react-router-dom';

export default class CreatePost extends Component {
    constructor(props) {
      super(props);
      this.onChangePrice = this.onChangePrice.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDepreciation = this.onChangeDepreciation.bind(this);
      this.onChangeBrand = this.onChangeBrand.bind(this);
      this.onChangeEngineCapacity = this.onChangeEngineCapacity.bind(this);
      this.onChangeRegisteredDate = this.onChangeRegisteredDate.bind(this);
      this.onChangeMileage = this.onChangeMileage.bind(this);
      this.onChangeCategory = this.onChangeCategory.bind(this);
      this.onChangePhotoUrl = this.onChangePhotoUrl.bind(this);
      this.onChangePhotoByte = this.onChangePhotoByte.bind(this);
      this.saveImage = this.saveImage.bind(this);
      // this.convertBase64 = this.convertBase64.bind(this);
      // this.convert = this.convert.bind(this);
      this.savePost = this.savePost.bind(this);
      this.newPost = this.newPost.bind(this);
      this.onClickPriceEstimate = this.onClickPriceEstimate.bind(this);

      this.state = {
        postId: null,
        price: 0,
        depreciation: 0,
        description: "",
        brand: "",
        engineCapacity: "",
        registeredDate: "",
        mileage: 0,
        category: "",
        photoUrl: "",
        priceEstimate: 0,
        photoByte: null,
        submitted: false,
        currentPhoto: null,
        carpostimage: 0,
        imageUploadStatus: false
      };
    }

    onChangePrice(e) {
      this.setState({
        price: e.target.value
      });
    }

    onChangeDepreciation(e) {
      this.setState({
        depreciation: e.target.value
      })
    }

    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      })
    }

    onChangeBrand(e) {
      this.setState({
        brand: e.target.value
      })
    }

    onChangeEngineCapacity(e) {
      this.setState({
        engineCapacity: e.target.value
      })
    }

    onChangeRegisteredDate(e) {
      this.setState({
        registeredDate: e.target.value
      })
    }

    onChangeMileage(e) {
      this.setState({
        mileage: e.target.value
      })
    }

    onChangeCategory(e) {
      this.setState({
        category: e.target.value
      })
    }

    onChangePhotoUrl(e) {
      this.setState({
        photoUrl: e.target.value
      })
    }

    onChangePhotoByte(e) {
      this.setState({
        photoByte: e.target.files[0],
        currentPhoto: URL.createObjectURL(e.target.files[0])
      })
      console.log(e.target.files[0]);
    }

    onClickPriceEstimate() {
      let to_estimate = [
        this.state.depreciation,
        this.state.registeredDate,
        this.state.mileage,
        this.state.engineCapacity,
        this.state.brand,
        this.state.category,
      ]

    PostService.getEstimate(to_estimate)
      .then(response => {
        this.setState({
          priceEstimate: response.data
        });
      });
    }


    savePost() {
        // this.saveImage();
        var data = {
            //postId: this.state.postId,
            price: this.state.price,
            description: this.state.description,
            brand: this.state.brand,
            engineCapacity: this.state.engineCapacity,
            registeredDate: this.state.registeredDate,
            mileage: this.state.mileage,
            category: this.state.category,
            photoUrl: this.state.photoUrl,
            carpostimage: this.state.carpostimage
        };
        console.log(data);
        PostService.createPost(data,this.state.carpostimage)
            .then(response => {
                this.setState({
                    postId: response.data.postId,
                    price: response.data.price,
                    description: response.data.description,
                    brand: response.data.brand,
                    engineCapacity: response.data.engineCapacity,
                    registeredDate: response.data.registeredDate,
                    mileage: response.data.mileage,
                    category: response.data.category,
                    photoUrl: response.data.photoUrl,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    saveImage() {
      const newFile = new FormData();
      newFile.append("photoParam", this.state.photoByte, this.state.photoByte.name);
      console.log(newFile);
      PostService.uploadImage(newFile)
          .then(response => {
              this.setState({
                carpostimage: response.data,
                imageUploadStatus: true
              });
          })
          .catch(e => {
              console.log(e);
          });
  }
    
    newPost() {
        this.setState({
            postId: 0,
            price: 0,
            description: "",
            brand: "",
            engineCapacity: "",
            registeredDate: new Date(),
            mileage: 0,
            category: "",
            photoUrl: "",
            photoByte: null
          });
    }
  
    render() {
      //condition
      if(!sessionStorage.getItem("status")){

        window.alert("Please Log In First!");

        return(<Redirect to='/LogIn'/>);
      }
      //it not logged direct to login
      else{
      return (
        <div>
        {this.state.submitted?(<Redirect to='/CarList'/>):(
        <div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  required
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
                />
            </div>

            <div className="form-group">
                <label htmlFor="depreciation">Depreciation</label>
                <input
                  type="text"
                  className="form-control"
                  id="depreciation"
                  required
                  value={this.state.depreciation}
                  onChange={this.onChangeDepreciation}
                  name="depreciation"
                />
            </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  required
                  value={this.state.brand}
                  onChange={this.onChangeBrand}
                  name="brand"
                />
              </div>
              <div className="form-group">
                <label htmlFor="engineCapacity">Engine Capacity</label>
                <input
                  type="text"
                  className="form-control"
                  id="engineCapacity"
                  required
                  value={this.state.engineCapacity}
                  onChange={this.onChangeEngineCapacity}
                  name="brand"
                />
              </div>
              <div className="form-group">
                <label htmlFor="registeredDate">Registered Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="registeredDate"
                  required
                  value={this.state.registeredDate}
                  onChange={this.onChangeRegisteredDate}
                  name="registeredDate"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mileage">Mileage</label>
                <input
                  type="text"
                  className="form-control"
                  id="mileage"
                  required
                  value={this.state.mileage}
                  onChange={this.onChangeMileage}
                  name="mileage"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  required
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  name="category"
                />
              </div>
              <div className="form-group">
                <label htmlFor="photoUrl">Photo URL</label>
                <input 
                  type="text"
                  className="form-control"
                  id="photoUrl"
                  required
                  value={this.state.photoUrl}
                  onChange={this.onChangePhotoUrl}
                  name="photoUrl"
                />
              </div>

              <div>
                <label htmlFor="priceEstimate">Price Estimate</label>
                <p>{this.state.priceEstimate}</p>
                <button
                  onClick={this.onClickPriceEstimate}>
                  Get Estimate
                </button>
              </div>
              <br></br>

              {this.state.imageUploadStatus?(
              <div>
              <span>Upload Sucessful!</span>
              <img src = {this.state.currentPhoto}/>
              </div>):(
              <div className="form-group">
                <label htmlFor="photoByte">Upload Photo</label>
                <img src = {this.state.currentPhoto}/>
                <input 
                  type="file"
                  className="form-control"
                  id="photoByte"
                  required
                  // value={this.state.photoByte}
                  onChange={this.onChangePhotoByte}
                  name="photoByte"
                />
                <br/>
                <button onClick={this.saveImage} className="btn btn-success" >Upload Image</button>
              </div>)}
              <br/>
              {this.state.imageUploadStatus?(<button onClick={this.savePost} className="btn btn-success" >
                Submit
            </button>):(
              <span>Please Upload an Image only in png format beacause we are noobs</span>)}
            </div>
            )}</div>
      );}
    }
  }