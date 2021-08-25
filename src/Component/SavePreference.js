
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
          preferenceStatus: false
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
        console.log(data);
        PostService.savePreference(data)
        .then(response => {
          this.setState({
            preferenceStatus: true,
          });
        })
            .catch(e => {
                console.log(e);
            });
    }

    checkCurrentPreference() {
      console.log("hi");
      PostService.checkCurrentPreference(sessionStorage.getItem("userId"))
          .then(response => {

            if(response.status == 200)
              this.setState({
                preferenceStatus: true,
                model: response.data.model,
                highestPrice: response.data.highestPrice,
                lowestPrice : response.data.lowestPrice,
                brand: response.data.brand,
                engineCapacityMax: response.data.engineCapacityMax,
                engineCapacityMin: response.data.engineCapacityMin,
                category: response.data.category
              });
              console.log(response.data);
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

  
    render(){


      const {model,highestPrice,
      lowestPrice, brand, engineCapacityMax,
      engineCapacityMin,category,preferenceStatus}  = this.state;

      if(!preferenceStatus)
        return(
          <div>
          <h1>Save your Preference</h1>
          <br/>
          <div>
              <div>Model: <input type="text" onChange={this.onChangeModel} value ={model}/></div>
          </div>
          <br/>
          <div>
              <div>Brand: <input type="text" onChange={this.onChangeBrand} value ={brand} /></div>
          </div>
          <br/>
          <div>
              <div>Category: <input type="text" onChange={this.onChangeCategory} value ={category}/></div>
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
            <div><div>Brand: {brand} </div></div>
          </div>
          <br/>
          <div>
            <div><div>Category: {category} </div></div>
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