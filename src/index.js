import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import web3 from "./web3";
import factory from "./factory";
// import sign from "./sign";
import abi from "ethereumjs-abi";

if (module.hot) {
  module.hot.accept();
}

class App extends Component {
  state = {
    message: "",
    signature: "",
    view: false,
    message2: "",
    signature2: "",
    signer: "",
    view2: false,
  };

  // async componentDidMount() {
  //   const signer = await factory.getSigner(
  //     this.state.message2, this.state.signature2
  //   ).call();
  //   this.setState({signer: signer});
  // };

  call = (err, message) => {
    console.log(err, message);
    this.setState({ signature: message.toString() });
    this.setState({ view: true });
  };

  sign = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // var hash =web3.utils.sha3(this.state.message);
    var hash =
      "0x" +
      abi
        .soliditySHA3(["address", "string"], [accounts[0], this.state.message])
        .toString("hex");
    web3.eth.personal.sign(hash, accounts[0], this.call);
    console.log(accounts[0]);
  };


  getSigner = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .getSigner(this.state.message2, this.state.signature2)
      .call({from: accounts[0]})
      .then((res) => this.setState({signer: res}));
    this.setState({ view2: true });
  };

  const 

  render() {
    // console.log(this.state.message);
    console.log(this.state.signature);
    return (
      <div>
        <h2 className="ui header" style={{ paddingTop: "50px", paddingLeft: "25px", color: "white" }}>
          <i aria-hidden="true" className="gg icon"></i>
          <div className="content">
            Trust Signature
            <div className="sub header" style={{ color: "white" }}>
              Create cryptographic signs
            </div>
          </div>
        </h2>

        <div className="ui container" style={{ paddingTop: "70px" }} onSubmit={this.sign}>
          <form className="ui form">
              <div className="field">
                  <label>
                  <h3 style={{ color: "white" }}>Enter the Messsage</h3>
                  </label>
                  <input
                  placeholder="Enter message"
                  value={this.state.message}
                  onChange={(event) => {
                      this.setState({ message: event.target.value, view: false, view2: false });
                  }}
                  />
              </div>
              <button className="ui primary icon right labeled button">
                  Sign Message<i aria-hidden="true" className="signup icon"></i>
              </button>
          </form>
          <div className="ui success message" style={{ display: this.state.view ? "block" : "none", overflow: "auto" }}>
              <div className="content">
                <div className="header">Your Signature!</div>
                <p>{this.state.signature}</p>
              </div>
          </div>
        </div>


        <div className="ui container" style={{ paddingTop: "70px" }} onSubmit={this.getSigner}>
          <form className="ui form">
            <div className="field">
                <label>
                <h3 style={{ color: "white" }}>
                    Enter the Messsage to verify
                </h3>
                </label>
                <input
                placeholder="Enter message"
                value={this.state.message2}
                onChange={(event) => {
                    this.setState({
                    message2: event.target.value,
                    view2: false,
                    });
                }}
                />
            </div>
            <div className="field">
                <label>
                <h3 style={{ color: "white" }}>
                    Enter the Signature to verify
                </h3>
                </label>
                <input
                placeholder="Enter Signature"
                value={this.state.signature2}
                onChange={(event) => {
                    this.setState({
                    signature2: event.target.value,
                    view2: false,
                    });
                }}
                />
            </div>
            <button className="ui primary icon right labeled button">
                Get Signer<i aria-hidden="true" className="key icon"></i>
            </button>
          </form>
          <div className="ui success message" style={{ display: this.state.view2 ? "block" : "none", overflow: "auto"}}>
              <div className="content">
                  <div className="header">The Address of the Signer is:{this.state.signer}</div>
                  <p></p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
