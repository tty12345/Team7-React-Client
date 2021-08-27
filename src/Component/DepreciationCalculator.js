import React, { Component } from 'react';

export default class DepreciationCalculator extends Component {

    constructor(props) {
        super(props);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeRegisteredDate = this.onChangeRegisteredDate.bind(this);
        this.calculateDepreciation = this.calculateDepreciation.bind(this);
        this.onChangeArf = this.onChangeArf.bind(this);

  
        this.state = {
            price: 0,
            depreciation: 0,
            registeredDate: "",
            arf: 0,
            omv: 0,
            rebate: 0
        };
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeRegisteredDate(e) {
        this.setState({
            registeredDate: e.target.value
        })
    }

    onChangeArf(e) {
        this.setState({
            arf: e.target.value
        })
    }

    calculateDepreciation(e) {
        // Calculates the age of the car
        var today = Math.floor(Date.now() / 1000);
        var registered = Math.floor(Date.parse(this.state.registeredDate) / 1000)

        var difference = Math.floor((today - registered) / 60 / 60 / 24);
        var age = (difference / 365).toFixed(2);
        var yearsLeft = (10 - age).toFixed(2);
        
        var omv;
        var ARF = this.state.arf;

        if (ARF <= 20000) {
            // omv < 20k
            omv = ARF / 2;
        } else {
            // omv > 50k
            var remain1 = ARF - 20000;
            if (remain1 > 30000) {
                omv = ((ARF - 62000) / 1.8) + 50000;
            } else {
                // omv > 20k and <50k
                omv = ((ARF - 20000) / 1.4) + 20000;
            }
        }

        var rebate = 0.5 * ARF;;

        // if (age <= 5) {
        //     rebate = 0.75 * ARF;
        // } else if (age > 5 && age <= 6) {
        //     rebate = 0.70 * ARF; 
        // } else if (age > 6 && age <= 7) {
        //     rebate = 0.65 * ARF; 
        // } else if (age > 7 && age <= 8) {
        //     rebate = 0.60 * ARF; 
        // } else if (age > 8 && age <= 9) {
        //     rebate = 0.55 * ARF; 
        // } else if (age > 9 && age <= 10) {
        //     rebate = 0.50 * ARF; 
        // } else if (age > 10) {
        //     rebate = 0;
        // }
        // console.log(omv);
        // console.log(age);
        // console.log(yearsLeft);
        // console.log(rebate);

        var dep = (this.state.price - rebate) / yearsLeft;

        this.setState({
            depreciation: dep,
            omv: omv,
            rebate: rebate
        })
    }

    render() {
        return (
            <div>
                <h2>Depreciation Calculator</h2>
                <h4>Calculate the depreciation on your car</h4>
                <br></br>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                    type="text"
                    className="form-control"
                    id="price"
                    required
                    name="price"
                    onChange={this.onChangePrice}
                    placeholder="S$"
                    />
                </div>
                <br></br>
                <div>
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
                <br></br>
                <div>
                    <label htmlFor="arf">ARF</label>
                    <input
                    type="text"
                    className="form-control"
                    id="arf"
                    required
                    onChange={this.onChangeArf}
                    name="arf"
                    placeholder="S$"
                    />
                </div>
                <br></br>
                <div>
                    <button onClick={this.calculateDepreciation} class="btn btn-primary">Calculate</button>
                </div>
                <br></br>
                <div>
                    <label>Estimated Depreciation:</label>
                    <p>S${this.state.depreciation}</p>
                    <label>OMV:</label>
                    <p>S${this.state.omv}</p>
                    <label>Estimated rebate at end of COE:</label>
                    <p>S${this.state.rebate}</p>
                </div>
            </div>
        )
    }
}