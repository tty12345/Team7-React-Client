import React, { Component } from "react";
import{ DefaultCarsTable } from "./table/DefaultCarsTable";
import { Link } from "react-router-dom";
import HomeService from "../Services/HomeService";
import '../App.css';


const header = ["Category", "Quota", "Premium"];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logoutreload = this.logoutreload.bind(this);
    this.state = {
      title: "",
      categories: []
    };
  }
    
    // this method runs automatically when the page is loaded
    componentDidMount() {
      this.logoutreload()
      HomeService.getCoeTitle()
        .then(response => {
          this.setState({
            title: response.data
          });
        })
      
      HomeService.getCoePrices()
        .then(response => {
          this.setState({
            categories: response.data
          });
        })
    }

    logoutreload() {
      if (sessionStorage.getItem("logout")){
        window.location.reload();
        sessionStorage.removeItem("logout");
      }
    }

    
    render() {
      const { title, categories } = this.state;

        return (
            <div className="App">
               
            {/* <div className="jumbotron feature">
              <div className="container">
                <h1><span className="glyphicon glyphicon-equalizer"></span>Prices Updated Monthly</h1>
                <p>Using algorithms to determine your car's best selling price</p>
                <button><Link to={"/Estimate/"}>
                  Get Estimate
                </Link></button>
              </div>
            </div> */}
            <div className="container-fluid page-header">
            <h1 className="display-4 text-uppercase text-center mb-5"><font color="white">Welcome To</font> <font color="#F77D0A">CAR EXCHANGE</font></h1>
             {/* <p className="center"><font color="white">Welcome to CAR EXCHANGE – Singapore’s premier online car dealership since 2001. Get estimate selling price from the calculated large data across the market. Discover the large car models in out website with a remarkable ownership experience like no other.</font></p>  */}
            <h3><span className="glyphicon glyphicon-equalizer"></span><font color = "#ffffff" >Prices Updated Monthly</font></h3>
                <p><font size="5" color="white">Using algorithms to determine your car's best selling price</font></p>
                <Link to="/Estimate" className="btn py-3 px-5 btn-send-msg">Get Estimate</Link>
                </div> 
               <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="row mx-0">
                <div class="col-lg-6 px-0">
                    <div class="px-5 bg-secondary d-flex align-items-center justify-content-between" background styles="height: 350px;">
                        <img class="img-fluid flex-shrink-0 ml-n5 w-50 mr-4" src="images/banner-left.png" alt=""/>
                        <div class="text-right">
                            <h3 class="text-uppercase text-light mb-3">Want to sell your car?</h3>
                            <p class="mb-4 sell-car">Get a Quote today and sell your car at the best price!</p>
                            {/* <p><button class="btn py-3 px-5 btn-send-msg""><button onclick=""createPost()""}>Sell Now</button></p> */}
                            <Link to="/CreatePost" className="btn py-3 px-5 btn-send-msg">Sell Now</Link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 px-0">
                    <div class="px-5 bg-dark d-flex align-items-center justify-content-between" styles="height: 350px;">
                        <div class="text-left">
                            <h3 class="text-uppercase text-light mb-3">Looking for a car?</h3>
                            <p class="mb-4 buy-car">Buy your dream car today!</p>
                            {/* <p><a class="btn btn-primary"><Link to={"/CarList/"}>Buy Now</Link></a></p> */}
                            <Link to="/Carlist" className="btn py-3 px-5 btn-send-msg">Buy Now</Link>
                        </div>
                        <img className="img-fluid flex-shrink-1 mr-n5 w-50 ml-4" src="images/banner-right.png" alt=""/>
                   </div> 
                </div>
            </div>
        </div>
    </div>
            

      <div class="container-fluid py-5  page-middle">
        <div class="container-fluid pt-5 pb-3">
        <h1 class="display-4 text-uppercase text-center mb-5"><font color="#F77D0A">POPULAR</font> <font color="white">CAR LISTING</font></h1>
            <div class="d-flex row justify-content-center  align-items-center">
                <div class="col-lg-10 text-center align-items-center"  >
                    <img class="d-flex w-100 mb-4 center align-items-center" src="images/about.png" alt=""/>
                   
                </div>
                
            </div>
            <div>
                <DefaultCarsTable />
             </div>
            {/* <div className="row mt-3">
                <div className="col-lg-4 mb-2">
                    <div className="d-flex align-items-center bg-light p-4 mb-4" styles="height: 150px;">
                        <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" styles="width: 100px; height: 100px;">
                            <i className="fa fa-2x fa-headset text-secondary"></i>
                        </div>
                        <h4 className="text-uppercase m-0">24/7 Car Sale Support</h4>
                    </div>
                </div>
                <div className="col-lg-4 mb-2">
                    <div className="d-flex align-items-center bg-secondary p-4 mb-4" styles="height: 150px;">
                        <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" styles="width: 100px; height: 100px;">
                            <i className="fa fa-2x fa-car text-secondary"></i>
                        </div>
                        <h4 className="text-light text-uppercase m-0">Get estimate selling price</h4>
                    </div>
                </div>
                <div className="col-lg-4 mb-2">
                    <div className="d-flex align-items-center bg-light p-4 mb-4" styles="height: 150px;">
                        <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" styles="width: 100px; height: 100px;">
                            <i className="fa fa-2x fa-map-marker-alt text-secondary"></i>
                        </div>
                        <h4 className="text-uppercase m-0">Lots of car models</h4>
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    </div>

  <div class="container pt-5 pb-3">
    <div className="coe table home-table"> 
    <h2>{title}</h2>
    <table class="table table-striped home-table">
   
  <thead>
    
    <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
   
  </thead>
  <tbody>
    
  {Object.keys(categories).map((k, i) => {
                      let data = categories[k];
                      return (
                        <tr key={i}>
                          <td>{data.name}</td>
                          <td>{data.quota}</td>
                          <td>{data.premium}</td>
                        </tr>
                      );
                     })}
  </tbody>
</table>  
</div>  
</div>
           
    {/* <div className="container-fluid">
        <div className="row">
           <h2>{title}</h2>
               <table>
                   <thead>
                    <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
                     </thead>
                   <tbody>
                 {Object.keys(categories).map((k, i) => { 
                      let data = categories[k];
                      return (
                        <tr key={i}>
                          <td>{data.name}</td>
                          <td>{data.quota}</td>
                          <td>{data.premium}</td>
                        </tr>
                      );
                    })}
                    </tbody>
                </table>
              </div>
              </div>  */}
    
    <div className="container-fluid py-5">
        <div className="container pt-5 pb-3 contact-us">
           
            <h1 class="display-4 text-uppercase text-center mb-5">Contact Us</h1>
            <div class="row">
                <div class="col-lg-7 mb-2">
                    <div class="contact-form bg-light mb-4 contact-top" >
                        <form>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <input type="text" className="form-control p-4 contact-from" placeholder="Your Name" required="required"/>
                                </div>
                                <div className="col-6 form-group">
                                    <input type="email" className="form-control p-4 contact-from" placeholder="Your Email" required="required"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control p-4 contact-from" placeholder="Subject" required="required"/>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control py-3 px-4 contact-from" rows="5" placeholder="Message" required="required"></textarea>
                            </div>
                            <div>
                                <button class="btn py-3 px-5 btn-send-msg contact-submit" type="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-5 mb-2 ">
                    <div class="bg-secondary d-flex flex-column justify-content-center px-5 mb-4" styles="height: 435px;">
                        <div class="d-flex mb-3">
                            
                            <div class="mt-n1">
                                <h3 class="text-light contact-info"><span className="glyphicon glyphicon-home"></span><span> &nbsp;</span><b>Head Office</b></h3>
                                <p>25 Heng Mui Keng Terrace, Singapore 119615</p>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3"></i>
                            <div className="mt-n1">
                                <h3 className="text-light contact-info"><span className="glyphicon glyphicon-briefcase"></span><span> &nbsp;</span><b>Branch Office</b></h3>
                                <p>25 Heng Mui Keng Terrace, Singapore 119615</p>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3"></i>
                            <div className="mt-n1">
                                <h3 className="text-light contact-info"><span className="glyphicon glyphicon-user"></span><span> &nbsp;</span><b>Customer Service</b></h3>
                                <p>CarExchangeCS@carexchange.com</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3"></i>
                            <div className="mt-n1">
                                <h3 className="text-light contact-info"><span className="glyphicon glyphicon-envelope"></span><span> &nbsp;</span><b>Return & Refund</b></h3>
                                <p className="m-0">CarExchangeRefund@carexchange.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   

   
          </div>
        
        )
    }
}