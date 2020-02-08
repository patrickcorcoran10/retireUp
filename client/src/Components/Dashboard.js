import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    try {
      const res = await fetch(
        "https://www.slickcharts.com/sp500/returns/history.json"
      );
      const json = await res.json();
      this.setState({
        data: json
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <p>Hello Application from the Dashboard Component</p>
        <ul>
          {this.state.data.map(el => (
            <li>
              {el.year}: {el.totalReturn}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
