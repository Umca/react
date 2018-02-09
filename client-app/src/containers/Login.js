import React, { Component, Fragment } from 'react';
import API from '../services/instagram-api';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      openedTab: 'signup',
      signUpData: {
        firstName: '',
        lastName: '',
        password: '',
        email: ''
      },
      loginData: {
        password: '',
        email: ''
      }
    };
    this.updateTab = this.updateTab.bind(this);
  }

  instaLogin() {
    API.login();
  }

  handleInputChange(id, mode, e) {
    let data = this.state[mode + 'Data'];
    data[id] = e.target.value;
    this.setState({
      [mode + 'Data']: data
    });
  }

  login(e) {
    console.log(JSON.stringify(this.state.loginData));
    e.preventDefault();
    fetch('http://localhost:3003/api/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state.loginData)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        let loginData = {
          password: '',
          email: ''
        };

        this.setState({
          loginData
        });
      });
  }

  signUp(e) {
    console.log(JSON.stringify(this.state.signUpData));
    e.preventDefault();
    fetch('http://localhost:3003/api/signup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state.signUpData)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        let signUpData = {
          firstName: '',
          lastName: '',
          password: '',
          email: ''
        };

        this.setState({
          signUpData
        });
      });
  }

  updateTab(tab) {
    this.setState({
      openedTab: tab
    });
  }

  renderLogin() {
    return (
      <div id="login">
        <h1>Welcome Back!</h1>

        <form action="/" method="post">
          <div className="field-wrap">
            <input
              type="email"
              placeholder="Email address"
              required
              autoComplete="off"
              value={this.state.loginData.email}
              onChange={this.handleInputChange.bind(this, 'email', 'login')}
            />
          </div>

          <div className="field-wrap">
            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={this.state.loginData.password}
              onChange={this.handleInputChange.bind(this, 'password', 'login')}
            />
          </div>

          <p className="forgot">
            <a href="#">Forgot Password?</a>
          </p>

          <button
            className="button button-block"
            type="submit"
            onClick={this.login.bind(this)}
          >
            Log In
          </button>
        </form>
      </div>
    );
  }

  renderSignUp() {
    return (
      <div id="signup">
        <h1>Sign Up for Free</h1>
        <form action="/" method="post">
          <div className="top-row">
            <div className="field-wrap">
              <input
                type="text"
                required
                autoComplete="off"
                placeholder="First Name"
                value={this.state.signUpData.firstName}
                onChange={this.handleInputChange.bind(
                  this,
                  'firstName',
                  'signUp'
                )}
              />
            </div>

            <div className="field-wrap">
              <input
                type="text"
                required
                autoComplete="off"
                placeholder="Last Name"
                value={this.state.signUpData.lastName}
                onChange={this.handleInputChange.bind(
                  this,
                  'lastName',
                  'signUp'
                )}
              />
            </div>
          </div>

          <div className="field-wrap">
            <input
              type="email"
              required
              autoComplete="off"
              placeholder="Email Address"
              value={this.state.signUpData.email}
              onChange={this.handleInputChange.bind(this, 'email', 'signUp')}
            />
          </div>

          <div className="field-wrap">
            <input
              type="password"
              required
              autoComplete="off"
              placeholder="Set A Password"
              value={this.state.signUpData.password}
              onChange={this.handleInputChange.bind(this, 'password', 'signUp')}
            />
          </div>

          <button
            type="submit"
            className="button button-block"
            onClick={this.signUp.bind(this)}
          >
            Get Started
          </button>
        </form>
      </div>
    );
  }

  renderContent() {
    if (this.state.openedTab === 'signup') {
      return this.renderSignUp();
    } else {
      return this.renderLogin();
    }
  }

  render() {
    return (
      <Fragment>
        <p>U need to log in!!</p>
        <button>Login</button>

        <div className="form">
          <ul className="tab-group">
            <li
              className={`tab ${
                this.state.openedTab === 'signup' ? 'active' : ''
              }`}
              onClick={() => this.updateTab('signup')}
            >
              <a href="#signup">Sign Up</a>
            </li>
            <li
              className={`tab ${
                this.state.openedTab === 'login' ? 'active' : ''
              }`}
              onClick={() => this.updateTab('login')}
            >
              <a href="#login">Log In</a>
            </li>
          </ul>

          <div className="">{this.renderContent()}</div>

          <div id="login">
            <h1>Welcome Back!</h1>
          </div>
        </div>
      </Fragment>
    );
  }
}
