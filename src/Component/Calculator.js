import React, { Component } from 'react';
import '../App.css';

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.onChangeLoanAmount = this.onChangeLoanAmount.bind(this);
        this.onChangeInterestRate = this.onChangeInterestRate.bind(this);
        this.onChangeLoanPeriod = this.onChangeLoanPeriod.bind(this);
        this.calculateLoan = this.calculateLoan.bind(this);
        this.onClear = this.onClear.bind(this);

  
        this.state = {
            loanAmount: "",
            interestRate: "",
            loanPeriod: 1,
            monthlyInstallment: ""
        };
    }

    onChangeLoanAmount(e) {
        this.setState({
            loanAmount: e.target.value
        })
    }

    onChangeInterestRate(e) {
        this.setState({
            interestRate: e.target.value
        })
    }

    onChangeLoanPeriod(e) {
        this.setState({
            loanPeriod: e.target.value
        })
    }

    calculateLoan() {
        // console.log(this.state.loanAmount);
        // console.log(this.state.interestRate);
        // console.log(this.state.loanPeriod);
        if (this.state.loanAmount < 10000) {
            window.alert("Minimum loan amount is S$10,000");
            return;
        }

        var totalInterest = ((this.state.interestRate / 100) * this.state.loanAmount) * this.state.loanPeriod;
        var totalLoan = Number(this.state.loanAmount) + totalInterest;
        var months = this.state.loanPeriod * 12;
        this.setState({
            monthlyInstallment: Math.floor(totalLoan / months)
        })
    }

    onClear() {
        this.setState({
            loanAmount: "",
            interestRate: "",
            loanPeriod: 1,
            monthlyInstallment: ""
        })
    }

    render() {
        return (
            <div className = "main">
                <p className = "sign" align ="center">Car Installment Calculator</p>
                <div className = "form1">
                <h3>Calculate the monthly installment on your car here!</h3>
                <br></br>
                <table align="center">
                    <tr>
                        <td>
                            <label htmlFor="loanAmount">Loan Amount</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                id="loanAmount"
                                required
                                name="loanAmount"
                                onChange={this.onChangeLoanAmount}
                                value={this.state.loanAmount}
                                placeholder="S$"
                                size="50"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><p> </p></td>
                        <td><p> </p></td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="interestRate">Interest Rate</label>
                        </td>
                        <td className = "scroller">
                            <input
                                type="text"
                                className="form-control"
                                id="interestRate"
                                required
                                name="interestRate"
                                onChange={this.onChangeInterestRate}
                                value={this.state.interestRate}
                                placeholder="%"
                                size="50"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><p> </p></td>
                        <td><p> </p></td>
                    </tr>
                    <tr>
                        <td>
                        <label htmlFor="loanPeriod">Loan Period</label>
                        </td>
                        <td>
                            <input
                                type="range"
                                min="1"
                                max="7"
                                value={this.state.loanPeriod}
                                onChange={this.onChangeLoanPeriod}
                                id="loanPeriod"
                                required
                                name="loanPeriod"
                                style = {{width: "66%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><p> </p></td>
                        <td>
                            <p>{this.state.loanPeriod}</p>
                        </td>
                    </tr>
                </table>
                <br></br>
                                    
                </div>
                <div>
                    <button onClick={this.calculateLoan} class="btn btn-success">Calculate</button>
                </div>
                <br></br>
                <div>
                    <label>Monthly Installment:</label>
                    <p>S${this.state.monthlyInstallment}</p>
                </div>
                <div>
                    <button onClick={this.onClear} class="btn btn-success">Clear</button>
                </div>
                <br></br>
                <br></br>
                <div>
                    <p>Minimum loan amount is S$10,000.</p>
                    <p>The maximum loan period is 7 years.</p>
                </div>
            </div>
        )
    }
}