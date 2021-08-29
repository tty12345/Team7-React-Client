import React, { Component } from "react";
import PostService from "../Services/PostService";
import { Redirect } from 'react-router-dom';
import UserDataService from "../Services/UserService";
import '../App.css';
import { Link } from 'react-router-dom';

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
      this.savePost = this.savePost.bind(this);
      // this.newPost = this.newPost.bind(this);
      this.onClickPriceEstimate = this.onClickPriceEstimate.bind(this);

      this.state = {
        postId: null,
        price: "",
        depreciation: "",
        description: "",
        brand: "",
        realBrand: "",
        realCategory: "",
        engineCapacity: "",
        registeredDate: "",
        mileage: "",
        category: "",
        photoUrl: "",
        priceEstimate: 0,
        photoByte: null,
        submitted: false,
        currentPhoto: null,
        carpostimage: 0,
        imageUploadStatus: false,
        imgExist: false,
        IMAGE: null
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
        currentPhoto: URL.createObjectURL(e.target.files[0]),
        imageExist: true
      })
    }

    onClickPriceEstimate() {
      // calculates number of days in between today and the registered date to send to ML model
      var today = Math.floor(Date.now() / 1000);
      var registered = Math.floor(Date.parse(this.state.registeredDate) / 1000)

      var difference = Math.floor((today - registered) / 60 / 60 / 24);

      // one hot encoding for mileage
      var mileage_bin = this.state.mileage
      if (mileage_bin >= 0 && mileage_bin < 24000) {
        mileage_bin = 0;
      } else if (mileage_bin >= 24000 && mileage_bin < 48000) {
        mileage_bin = 1;
      } else if (mileage_bin >= 48000 && mileage_bin < 72000) {
        mileage_bin = 2;
      } else if (mileage_bin >= 72000 && mileage_bin < 96000) {
        mileage_bin = 3;
      } else if (mileage_bin >= 96000 && mileage_bin < 120000) {
        mileage_bin = 4;
      } else if (mileage_bin >= 120000 && mileage_bin < 144000) {
        mileage_bin = 5;
      } else if (mileage_bin >= 144000 && mileage_bin < 168000) {
        mileage_bin = 6;
      } else if (mileage_bin >= 168000 && mileage_bin < 192000) {
        mileage_bin = 7;
      } else if (mileage_bin >= 192000 && mileage_bin < 216000) {
        mileage_bin = 8;
      } else {
        mileage_bin = 9;
      }

      // one hot encoding for engine capacity
      var engineCap = this.state.engineCapacity;
      if (engineCap >= 0 && engineCap < 600) {
        engineCap = 0;
      } else if (engineCap >= 600 && engineCap < 1200) {
        engineCap = 1;
      } else if (engineCap >= 1200 && engineCap < 1800) {
        engineCap = 2;
      } else if (engineCap >= 1800 && engineCap < 2400) {
        engineCap = 3;
      } else {
        engineCap = 4;
      }

      let to_estimate = [
        this.state.depreciation,
        difference.toString(),
        mileage_bin,
        engineCap,
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
        if (this.state.price === "" || this.state.depreciation === "" || this.state.brand === ""
          || this.state.description === "" || this.state.engineCapacity === ""
          || this.state.registeredDate === "" || this.state.mileage === "" || this.state.category === "") {
          return;
        }

        var data = {
            postId: this.state.postId,
            price: this.state.price,
            depreciation: this.state.depreciation,
            description: this.state.description,
            brand: this.state.brand,
            engineCapacity: this.state.engineCapacity,
            registeredDate: this.state.registeredDate,
            mileage: this.state.mileage,
            category: this.state.category,
            photoUrl: this.state.photoUrl,
            userId: sessionStorage.getItem("userId")
        };
        console.log(data);
        PostService.createPost(data,this.state.carpostimage)
            .then(response => {
                this.setState({
                    postId: response.data.postId,
                    price: response.data.price,
                    depreciation: response.data.depreciation,
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
    
  

    checkPostStatus(){
        const postId = sessionStorage.getItem("editPostItem");
        if(postId != null)
        UserDataService.getCar(postId)
          .then(response => {
            this.setState({
              postId:postId,
              price: response.data.price,
              depreciation: response.data.depreciation,
              description: response.data.description,
              brand: response.data.brand,
              realBrand: response.data.brand,
              engineCapacity: response.data.engineCapacity,
              registeredDate: response.data.registeredDate,
              mileage: response.data.mileage,
              category: response.data.category,
              realCategory: response.data.category,
              photoUrl: response.data.photoUrl,
              // carpostimage:response.data.carPostImage.imgId,   
              // IMAGE: response.data.carPostImage.carpostImage,
              // imageUploadStatus: true
            });
            if(response.data.carPostImage != null)
              this.setState({
                carpostimage:response.data.carPostImage.imgId,   
                IMAGE: response.data.carPostImage.carpostImage
              });
            
            this.setBrandHotToReal(this.state.brand);
            this.setCategoryHotToReal(this.state.category);
            sessionStorage.removeItem("editPostItem");
          })
          .catch(e => {
              console.log(e);
          });
    }

    componentDidMount() {
      this.checkPostStatus();
    }
    
    setBrandHotToReal(hotBrand){

      const brands =["Audi", "Austin", "BMW", "Citron","Ferrari", "Fiat", "Honda", "Hyundai", "Kia", "Lexus"
      ,"Mini","Mercedes-Benz","Mitsubishi","Morris","Nissan","Opel","Peugeot","Porsche","Renault","Subaru","Suzuki"
      ,"Toyota","Volkswagen","Volvo"];

      for (var i = 0; i < 23; i++){
        if (brands[i] === hotBrand){
          this.setState({brand: i+1});
        }
      }
    }

    setCategoryHotToReal(hotCategory){

      const category =["Hatchback", "Luxury", "MPV", "Others","SUV", "Sedan", "Sports", "Stationwagon", "Truck", "Van"];

      for (var i = 0; i < 10; i++){
        if (category[i] === hotCategory){
          this.setState({category: i+1});
        }
      }


    }

    render() {
      //condition
      //it not logged direct to login
      if (sessionStorage.getItem("status") == 'true' || sessionStorage.getItem("googleLogin") == "true"){
        return (
          <div>
             <div className="container-fluid page-page">
            <div class="main createcar">
            <div>
            <p className = "sign createpost" align = "center">Create <font color="#F77D0A">your</font> car post</p>
          </div>
          {this.state.submitted?(<Redirect to='/CarList'/>):(
            
          <div >
           
              <div className="form-group create">
                  <label htmlFor="depreciation">Depreciation (Annual)</label> 
                  <input
                    type="text"
                    className="form-control depreciation"
                    id="depreciation"
                    required
                    value={this.state.depreciation}
                    onChange={this.onChangeDepreciation}
                    name="depreciation"
                    placeholder="S$"
                  />
                  <Link to="/DepreciationCalculator" className="btn btn-default"><b>Depreciation Calculator</b></Link>
              </div>

                <div className="form-group create">
                  <label htmlFor="brand" >Brand</label>
                  <br></br>
                  <select name="category" onChange={this.onChangeBrand}>
                    <option value={this.state.brand}>{this.state.realBrand}</option>
                    <option value='0'>Audi</option>
                    <option value='1'>Austin</option>
                    <option value='2'>BMW</option>
                    <option value='3'>Citron</option>
                    <option value='4'>Ferrari</option>
                    <option value='5'>Fiat</option>
                    <option value='6'>Honda</option>
                    <option value='7'>Hyundai</option>
                    <option value='8'>Kia</option>
                    <option value='9'>Lexus</option>
                    <option value='10'>Mini</option>
                    <option value='11'>Mercedes-Benz</option>
                    <option value='12'>Mitsubishi</option>
                    <option value='13'>Morris</option>
                    <option value='14'>Nissan</option>
                    <option value='15'>Opel</option>
                    <option value='16'>Peugeot</option>
                    <option value='17'>Porsche</option>
                    <option value='18'>Renault</option>
                    <option value='19'>Subaru</option>
                    <option value='20'>Suzuki</option>
                    <option value='21'>Toyota</option>
                    <option value='22'>Volkswagen</option>
                    <option value='23'>Volvo</option>
                  </select>
                </div>
                <div className="form-group create ">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                    placeholder="Car Model"
                  />
                </div>
                <div className="form-group create">
                  <label htmlFor="engineCapacity">Engine Capacity (in cc)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="engineCapacity"
                    required
                    value={this.state.engineCapacity}
                    onChange={this.onChangeEngineCapacity}
                    name="brand"
                    placeholder="cc"
                  />
                </div>
                <div className="form-group create">
                  <label htmlFor="registeredDate">Registered Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="registeredDate"
                    required
                    value={this.state.registeredDate}
                    onChange={this.onChangeRegisteredDate}
                    name="registeredDate"
                  />
                </div>
                <div className="form-group create">
                  <label htmlFor="mileage">Mileage</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mileage"
                    required
                    value={this.state.mileage}
                    onChange={this.onChangeMileage}
                    name="mileage"
                    placeholder="km"
                  />
                </div>
                <div className="form-group create" >
                  <label htmlFor="category">Category</label>
                  <br></br>
                 <span><select name="category" onChange={this.onChangeCategory}>
                    <option value={this.state.category}>{this.state.realCategory}</option>
                    <option value='1'>Hatchback</option>
                    <option value='2'>Luxury</option>
                    <option value='3'>MPV</option>
                    <option value='4'>Others</option>
                    <option value='5'>SUV</option>
                    <option value='6'>Sedan</option>
                    <option value='7'>Sports</option>
                    <option value='8'>Stationwagon</option>
                    <option value='9'>Truck</option>
                    <option value='10'>Van</option>
                  </select>
                  </span> 
                </div>
                <br></br>
                <div>
                  <label htmlFor="priceEstimate" class = "price">Price Estimate</label>
                  <br></br>
                  <p class="price">${this.state.priceEstimate}</p>
                  <br></br>
                  <button
                    onClick={this.onClickPriceEstimate} type="button" className="btn btn-success">
                    Get Estimate
                  </button>
                </div>
                <br></br>
              <form>
                <div className="form-group create">
                  <label htmlFor="price">Asking Price (Get an estimate of your car's price above)</label><span>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    required
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    name="price"
                    placeholder="S$"
                  />
                  </span>
              </div>

                <div className="form-group create">
                  <label htmlFor="photoUrl">Photo URL</label> <span>
                  <input 
                    type="text"
                    className="form-control"
                    id="photoUrl"
                    value={this.state.photoUrl}
                    onChange={this.onChangePhotoUrl}
                    name="photoUrl"
                  />
                  </span>
                </div>
              </form>
          

                {this.state.imageUploadStatus?(
                <div>
                <span>Upload Sucessful!</span>
                </div>):(
                <div className="form-group create">
                  {this.state.IMAGE?
                  <div>
                  <label htmlFor="photoByte">Current Image:</label>
                  <img alt ="" src = {"data:image/png;base64,"+this.state.IMAGE} styles="width:550px;"/>
                  </div>:
                  <div>
                  <label htmlFor="photoByte">Upload Photo</label>
                  <img src = {this.state.currentPhoto} styles="width:550px;"/>
                  
                  </div>}
                  <input 
                    type="file"
                    className="form-control"
                    id="photoByte"
                    // value={this.state.photoByte}
                    onChange={this.onChangePhotoByte}
                    name="photoByte"
                  />
                  <br/>
                </div>)}
                {this.state.imageUploadStatus?(<button onClick={this.savePost} className="btn btn-success" >
                  Submit
              </button>):(
                <div>

                {this.state.imageExist?
                <button onClick={this.saveImage} className="btn btn-success" >Upload Image</button>:<div></div>}


                </div>
                 
                )}
                </div>
              
             
              )}
          </div>
          </div>
        </div>
        );
      }
      else {
        sessionStorage.setItem("ToWhere", "sellcar");
        window.alert("Please Log In First!");
        return(
          <Redirect to='/login'/>)
      }
    }
}

  //test