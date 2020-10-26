import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {


  homeLoanAmount: number = 0;
  interestRate: number;
  loanTenure: number;
  step: number = 10

  max = 100;
  min = 0;


  loanEMI: number;
  InterestPayable: number;
  TotalPayment: number;


  payableamount: number
  totalInterest: number = 0


  emi: number;
  public pieChartLabels = ['Principle Loan Amount', 'Total Interest'];
  public pieChartData = [this.homeLoanAmount, this.totalInterest];
  public pieChartType = 'pie';


  constructor() { }

  ngOnInit(): void {
  }

  CalculteEmi() {
    // [P x R x (1+R)^N]/[(1+R)^N-1]

    this.emi = Math.floor((this.homeLoanAmount * (this.interestRate / 12 / 100) * Math.pow(1 + (this.interestRate / 12 / 100), this.loanTenure * 12)) / (Math.pow(1 + (this.interestRate / 12 / 100), this.loanTenure * 12) - 1))

    this.payableamount = this.emi * this.loanTenure * 12
    this.totalInterest = this.payableamount - this.homeLoanAmount

    this.pieChartData = [this.homeLoanAmount, this.totalInterest];
  }

}
