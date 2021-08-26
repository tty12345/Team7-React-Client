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
            <div class="container-fluid page-header">
        <h1><span className="glyphicon glyphicon-equalizer"></span><font color = "#ffffff" >Prices Updated Monthly</font></h1>
                <p>Using algorithms to determine your car's best selling price</p>
                <button><Link to={"/Estimate/"}>
                  Get Estimate
                </Link></button>
                </div>
        

            <div className="container">
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
              
            </div>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          <h1 className="page-header">Best Sellers
                              <small> Last 30 days</small>
                          </h1>
                          <p>text</p>
                      </div>
                  </div>
                  <div className="row">
                      <article className="col-md-4 article-intro">
                          <a href="#">
                              <img className="img-responsive img-rounded" src="holder.js/700x300" alt=""/>
                          </a>
                          <h3>
                              <a href="#">car No.1</a>
                          </h3>
                          <p>text</p>
                      </article>
                      <article className="col-md-4 article-intro">
                          <a href="#">
                              <img className="img-responsive img-rounded" src="holder.js/700x300" alt=""/>
                          </a>
                          <h3>
                              <a href="#">car No.2</a>
                          </h3>
                          <p> text</p>
                      </article>

                      <article className="col-md-4 article-intro">
                          <a href="#">
                              <img className="img-responsive img-rounded" src="holder.js/700x300" alt=""/>
                          </a>
                          <h3>
                              <a href="#">car No.3</a>
                          </h3>
                          <p> text</p>
                      </article>
                  </div>
              </div>
            {/* <div>
              <DefaultCarsTable />
            </div> */}

<div class="container-fluid py-5">
        <div class="container pt-5 pb-3">
            <h1 class="display-4 text-uppercase text-center mb-5">Welcome To <span class="text-primary">Car Exchange</span></h1>
            <div class="row justify-content-center">
                <div class="col-lg-10 text-center">
                    <img class="w-75 mb-4" src="images/about.png" alt=""/>
                    <p>Justo et eos et ut takimata sed sadipscing dolore lorem, et elitr labore labore voluptua no rebum sed, stet voluptua amet sed elitr ea dolor dolores no clita. Dolores diam magna clita ea eos amet, amet rebum voluptua vero vero sed clita accusam takimata. Nonumy labore ipsum sea voluptua sea eos sit justo, no ipsum sanctus sanctus no et no ipsum amet, tempor labore est labore no. Eos diam eirmod lorem ut eirmod, ipsum diam sadipscing stet dolores elitr elitr eirmod dolore. Magna elitr accusam takimata labore, et at erat eirmod consetetur tempor eirmod invidunt est, ipsum nonumy at et.</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-4 mb-2">
                    <div class="d-flex align-items-center bg-light p-4 mb-4" styles="height: 150px;">
                        <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" styles="width: 100px; height: 100px;">
                            <i class="fa fa-2x fa-headset text-secondary"></i>
                        </div>
                        <h4 class="text-uppercase m-0">24/7 Car Sale Support</h4>
                    </div>
                </div>
                <div class="col-lg-4 mb-2">
                    <div class="d-flex align-items-center bg-secondary p-4 mb-4" styles="height: 150px;">
                        <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" styles="width: 100px; height: 100px;">
                            <i class="fa fa-2x fa-car text-secondary"></i>
                        </div>
                        <h4 class="text-light text-uppercase m-0">Get estimate selling price</h4>
                    </div>
                </div>
                <div class="col-lg-4 mb-2">
                    <div class="d-flex align-items-center bg-light p-4 mb-4" styles="height: 150px;">
                        <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4" styles="width: 100px; height: 100px;">
                            <i class="fa fa-2x fa-map-marker-alt text-secondary"></i>
                        </div>
                        <h4 class="text-uppercase m-0">Lots of car models</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
           
            <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="row mx-0">
                <div class="col-lg-6 px-0">
                    <div class="px-5 bg-secondary d-flex align-items-center justify-content-between" background styles="height: 350px;">
                        <img class="img-fluid flex-shrink-0 ml-n5 w-50 mr-4" src="images/banner-left.png" alt=""/>
                        <div class="text-right">
                            <h3 class="text-uppercase text-light mb-3">Want to sell your car?</h3>
                            <p class="mb-4">Lorem justo sit sit ipsum eos lorem kasd, kasd labore</p>
                            <a class="btn btn-primary py-2 px-4" href="">Start Now</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 px-0">
                    <div class="px-5 bg-dark d-flex align-items-center justify-content-between" styles="height: 350px;">
                        <div class="text-left">
                            <h3 class="text-uppercase text-light mb-3">Looking for a car?</h3>
                            <p class="mb-4">Lorem justo sit sit ipsum eos lorem kasd, kasd labore</p>
                            <a class="btn btn-primary py-2 px-4" href="">Start Now</a>
                        </div>
                        <img class="img-fluid flex-shrink-1 mr-n5 w-50 ml-4" src="images/banner-right.png" alt=""/>
                   </div> 
                </div>
            </div>
        </div>
    </div>
   

            <footer>
              <div className="footer-blurb">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-4 footer-blurb-item">
                      <h3><span className="glyphicon glyphicon-user"></span> Our Buyers</h3>
                      <p>Buyer Reviews</p>
                      <p><a className="btn btn-default" href="#">Buy now</a></p>
                    </div>
                    <div className="col-sm-4 footer-blurb-item">
                      <h3><span className="glyphicon glyphicon-user"></span> Our Sellers</h3>
                      <p>Seller reviews</p>
                      <p><a className="btn btn-default" href="#">Sell now</a></p>
                    </div>
                    <div className="col-sm-4 footer-blurb-item">
                      <h3><span className="glyphicon glyphicon-question-sign"></span> FAQ</h3>
                      <p>Common queries</p>
                      <p><a className="btn btn-default" href="#">Common nswers</a></p>
                    </div>
                  </div>
                </div>
                  </div>
                  
                  <div className="small-print">
                    <div className="container">
                      <p><a href="#">Terms &amp; Conditions</a> | <a href="#">Privacy Policy</a> | <a href="#">Contact</a></p>
                      <p>Copyright &copy; Example.com 2015 </p>
                    </div>
                  </div>
            </footer>
          </div>
        )
    }
}