
import React, { Component } from "react";
import PostService from "../Services/PostService";
import '../App.css';
import { FaLastfmSquare } from "react-icons/fa";


export default class SavePreference extends Component {
    constructor(props) {
        super(props);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeBrand=this.onChangeBrand.bind(this);
        this.onChangeCategory=this.onChangeCategory.bind(this);
        this.onChangeHighestPrice=this.onChangeHighestPrice.bind(this);
        this.onChangeLowPrice=this.onChangeLowPrice.bind(this);
        this.onChangeMaxEngineCapacity=this.onChangeMaxEngineCapacity.bind(this);
        this.onChangeMinEngineCapacity=this.onChangeMinEngineCapacity.bind(this);
        this.savePreference=this.savePreference.bind(this);
        // this.checkCurrentPreference = this.checkCurrentPreference.bind(this);
        this.Edit = this.Edit.bind(this);
      
        this.state = {
          model: "",
          highestPrice: "",
          lowestPrice : "",
          brand: "",
          engineCapacityMax: "",
          engineCapacityMin: "",
          category: "",
          userId: sessionStorage.getItem("userId"),
          preferenceStatus: false,        
          realBrand: "",
          realCategory: ""
        };
  
      }

      onChangeModel(e) {
        this.setState({
          model: e.target.value
        })
      }

      onChangeCategory(e) {
        this.setState({
          category: e.target.value
        })
      }

      onChangeBrand(e) {
        this.setState({
          brand: e.target.value
        })
      }

      onChangeHighestPrice(e) {
        this.setState({
          highestPrice: e.target.value
        })
      }

      onChangeLowPrice(e) {
        this.setState({
          lowestPrice: e.target.value
        })
      }

      onChangeMaxEngineCapacity(e) {
        this.setState({
          engineCapacityMax: e.target.value
        })
      }

      onChangeMinEngineCapacity(e) {
        this.setState({
          engineCapacityMin: e.target.value
        })
      }

      savePreference() {
        var data = {
            model: this.state.model,
            highestPrice: this.state.highestPrice,
            lowestPrice : this.state.lowestPrice,
            brand: this.state.brand,
            engineCapacityMax: this.state.engineCapacityMax,
            engineCapacityMin: this.state.engineCapacityMin,
            category: this.state.category,
            userId: sessionStorage.getItem("userId"),
        };
        PostService.savePreference(data)
        .then(response => {
          this.setState({
            preferenceStatus: true,
            realCategory: this.state.category,
            realBrand: this.state.brand,
            highestPrice: this.state.highestPrice,
            lowestPrice: this.state.lowestPrice,
            brand: this.state.brand,
            engineCapacityMax: this.state.engineCapacityMax,
            engineCapacityMin: this.state.engineCapacityMin,
            category: this.state.category,
          });
          this.returnBrandHotToReal(this.state.brand);
        })
            .catch(e => {
                console.log(e);
            });
    }

    checkCurrentPreference() {
      PostService.checkCurrentPreference(sessionStorage.getItem("userId"))
          .then(response => {

            if(response.status === 200)
              this.setState({
                preferenceStatus: true,
                model: response.data.model,
                highestPrice: response.data.highestPrice,
                lowestPrice : response.data.lowestPrice,
                brand: response.data.brand,
                realBrand:response.data.brand,
                realCategory:response.data.category,
                engineCapacityMax: response.data.engineCapacityMax,
                engineCapacityMin: response.data.engineCapacityMin,
                category: response.data.category
              });
              console.log(response.data);
              this.setBrandHotToReal(this.state.brand);
              this.setCategoryHotToReal(this.state.category);
          })
          .catch(e => {
              console.log(e);
          });
  }
    
  componentDidMount() {

    this.checkCurrentPreference();  

}

      Edit(){
        this.setState({
          preferenceStatus: false,
          
        });
      }

      setBrandHotToReal(hotBrand){

        const brands =["Audi", "Austin", "BMW", "Citron","Ferrari", "Fiat", "Honda", "Hyundai", "Kia", "Lexus"
      ,"Mini","Mercedes-Benz","Mitsubishi","Morris","Nissan","Opel","Peugeot","Porsche","Renault","Subaru","Suzuki"
      ,"Toyota","Volkswagen","Volvo"];

        for (var i = 0; i < 23; i++){
          if (brands[i] == hotBrand){
            this.setState({brand: i+1});
          }
        }
      }

      returnBrandHotToReal(currentBrandCode){

        const brands =["Audi", "Austin", "BMW", "Citron","Ferrari", "Fiat", "Honda", "Hyundai", "Kia", "Lexus"
      ,"Mini","Mercedes-Benz","Mitsubishi","Morris","Nissan","Opel","Peugeot","Porsche","Renault","Subaru","Suzuki"
      ,"Toyota","Volkswagen","Volvo"];

        for (var i = 0; i < 23; i++){
          if (i == currentBrandCode){
            this.setState({realBrand: brands[i]});
          }
        }
      }

    setCategoryHotToReal(hotCategory){

      const category =["Hatchback", "Luxury", "MPV", "Others","SUV", "Sedan", "Sports", "Stationwagon", "Truck", "Van"];

      for (var i = 0; i < 10; i++){
        if (category[i] == hotCategory){
          this.setState({category: i+1});
        }
      }
    }
    
    setCategoryHotToReal(currentCategoryCode){

      const category =["Hatchback", "Luxury", "MPV", "Others","SUV", "Sedan", "Sports", "Stationwagon", "Truck", "Van"];

      for (var i = 0; i < 10; i++){
        if (i == currentCategoryCode){
          this.setState({realCategory: category[i]});
        }
    }
  
  }
    render(){
      const {model,highestPrice,
      lowestPrice, brand, engineCapacityMax,
      engineCapacityMin,category,preferenceStatus, realBrand, realCategory}  = this.state;

      if(!preferenceStatus)
        return(
          <div>
          <h1>Save your Preference</h1>
          <br/>
          <div>
              <div>Model: <input type="text" onChange={this.onChangeModel} value ={model}/></div>
          </div>
          <br/>
          <div className="form-group">
                <label htmlFor="brand">Brand: </label>
                <select name="brand" onChange={this.onChangeBrand}>
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
          <br/>
          <div>
                <label htmlFor="category">Category: </label>
                <select name="category" onChange={this.onChangeCategory}>
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
              </div>
          <br/>
          <div>
              <div>Lowest Price: <input type="text" onChange={this.onChangeLowPrice} value ={lowestPrice}/></div>
              <br/>
              <div>Highest Price: <input type="text"onChange={this.onChangeHighestPrice} value ={highestPrice} /></div>
          </div>
          <br/>
          <div>
              <div>Engine Capacity Min: <input type="text" onChange={this.onChangeMinEngineCapacity} value ={engineCapacityMin}/></div>
              <br/>
              <div>Engine Capacity Max: <input type="text" onChange={this.onChangeMaxEngineCapacity} value ={engineCapacityMax}/></div>
          </div>
         

          <button onClick ={this.savePreference}> Submit </button>
          </div>
        );
        else
        return (

          <div>
          <h1>Your Preference</h1>
          <br/>
          <div>
              <div><div>Model: {model} </div></div>
          </div>
          <br/>
          <div>
            <div><div>Brand: {realBrand} </div></div>
          </div>
          <br/>
          <div>
            <div><div>Category: {realCategory} </div></div>
          </div>
          <br/>
          <div>
            <div><div>Highest Price: {highestPrice} </div></div>
              <br/>
            <div><div>Lowest Price: {lowestPrice} </div></div>
          </div>
          <br/>
          <div>
            <div><div>EngineCapacity Min: {engineCapacityMin} </div></div>
              <br/>
            <div><div>EngineCapacity Max: {engineCapacityMax} </div></div>
          </div>
         
          <button onClick ={this.Edit}> Edit </button>
          </div>

        );
    }
  
}