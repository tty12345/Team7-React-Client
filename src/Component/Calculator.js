import React, { Component } from 'react';

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.onChangeLoanAmount = this.onChangeLoanAmount.bind(this);
        this.onChangeInterestRate = this.onChangeInterestRate.bind(this);
        this.onChangeLoanPeriod = this.onChangeLoanPeriod.bind(this);
        this.calculateLoan = this.calculateLoan.bind(this);

  
        this.state = {
            loanAmount: 0,
            interestRate: 0,
            loanPeriod: 1,
            monthlyInstallment: 0
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

        var totalInterest = ((this.state.interestRate / 100) * this.state.loanAmount) * this.state.loanPeriod;
        var totalLoan = Number(this.state.loanAmount) + totalInterest;
        var months = this.state.loanPeriod * 12;
        this.setState({
            monthlyInstallment: Math.floor(totalLoan / months)
        })
    }

    render() {
        return (
            <div>
                <h2>Car Installment Calculator</h2>
                <h4>Calculate the monthly installment on your car here!</h4>
                <br></br>
                <div>
                    <label htmlFor="loanAmount">Loan Amount</label>
                    <input
                    type="text"
                    className="form-control"
                    id="loanAmount"
                    required
                    name="loanAmount"
                    onChange={this.onChangeLoanAmount}
                    placeholder="S$"
                    />
                </div>
                <div>
                    <label htmlFor="interestRate">Interest Rate</label>
                    <input
                    type="text"
                    className="form-control"
                    id="interestRate"
                    required
                    name="interestRate"
                    onChange={this.onChangeInterestRate}
                    placeholder="%"
                    />
                </div>
                <div>
                    <label htmlFor="loanPeriod">Loan Period</label>
                    <input
                    type="range"
                    min="1"
                    max="7"
                    value={this.state.loanPeriod}
                    onChange={this.onChangeLoanPeriod}
                    id="loanPeriod"
                    required
                    name="loanPeriod"
                    />
                    <p>{this.state.loanPeriod}</p>
                </div>
                <div>
                    <button onClick={this.calculateLoan} class="btn btn-primary">Calculate</button>
                </div>
                <br></br>
                <div>
                    <label>Monthly Installment:</label>
                    <p>S${this.state.monthlyInstallment}</p>
                </div>
            </div>
        )
    }
}