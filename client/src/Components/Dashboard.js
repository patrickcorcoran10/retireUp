import React, { Component } from "react";
import { Table } from "reactstrap";
// import Tooltip from "rc-tooltip";
// import Slider from "rc-slider";
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);
// const Handle = Slider.Handle;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cumulative: []
    };
  }
  async componentDidMount() {
    let url = "https://www.slickcharts.com/sp500/returns/history.json";
    try {
      const res = await fetch(url, { mode: "no-cors" });
      const json = await res.json();
      const data = json.reverse();
      console.log(data);
      let cumulative = [];
      let sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum += parseInt(data[i].totalReturn);
        cumulative.push(sum);
        console.log(sum);
      }
      setTimeout(
        function() {
          this.setState({
            data: data,
            cumulative: cumulative
          });
        }.bind(this),
        5000
      );
    } catch (error) {
      console.log("Something Fucked up and this is what it was: ", error);
    }
  }

  // componentDidMount() {
  //   this.getData();
  // }

  render() {
    return (
      <div>
        <h4>S&P 500 Total Returns by Year</h4>
        <Table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Return</th>
              <th>Cumulative Returns</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((el, index) => (
              <tr key={index}>
                <td>{el.year}</td>
                <td>{el.totalReturn}</td>
              </tr>
            ))}
            {this.state.cumulative.map((el, index) => (
              <tr key={index}>
                <td>hello</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
