import React, { Component } from "react";
import HomeService from "../Services/HomeService";
import '../App.css';

const header = ["Category", "Quota", "Premium"];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      title: "",
      categories: []
    };
  }
      
    //testing
    componentDidMount() {
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

      // this.setState({
      //   categories: JSON.parse(this.state.fromServer)
      // })
    }
    
    render() {
      const { categories } = this.state;

        return (
            <div className="App">
            <div className="jumbotron feature">
              <div className="container">
                <h1><span className="glyphicon glyphicon-equalizer"></span>Prices Updated Monthly</h1>
                <p>Using algorithms to determine your car's best selling price</p>
                <p><a className="btn btn-default" href="#">Get Estimate</a></p>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <h2>{this.state.title}</h2>
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