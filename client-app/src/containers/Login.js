import React, { Component, Fragment } from 'react'
import API from '../services/instagram-api'

export default class Login extends Component{

    constructor() {
        super()
        this.state = {
            openedTab: 'login'
        }
        this.login = this.login.bind(this)
        this.updateTab = this.updateTab.bind(this)
    }

    login() {
        API.login()
    }

    updateTab(tab) {
        this.setState({
            openedTab: tab
        })
    }

    renderLogin() {
        return (
            <div id="login">
                <h1>Welcome Back!</h1>

                <form action="/" method="post">

                    <div className="field-wrap">
                        <label>
                            Email Address<span className="req">*</span>
                        </label>
                        <input type="email" required autoComplete="off" />
                    </div>

                    <div className="field-wrap">
                        <label>
                            Password<span className="req">*</span>
                        </label>
                        <input type="password" required autoComplete="off" />
                    </div>

                    <p className="forgot"><a href="#">Forgot Password?</a></p>

                    <button
                        className="button button-block"
                        onClick={() => this.login()}
                    >Log In</button>

                </form>

            </div>
        )
    }

    renderSignUp() {
        return (
            <div id="signup">
                <h1>Sign Up for Free</h1>
            <form action="/" method="post">

                <div className="top-row">
                    <div className="field-wrap">
                        <label>
                            First Name<span className="req">*</span>
                        </label>
                        <input type="text" required autoComplete="off" />
                    </div>

                    <div className="field-wrap">
                        <label>
                            Last Name<span className="req">*</span>
                        </label>
                        <input type="text" required autoComplete="off" />
                    </div>
                </div>

                <div className="field-wrap">
                    <label>
                        Email Address<span className="req">*</span>
                    </label>
                    <input type="email" required autoComplete="off" />
                </div>

                <div className="field-wrap">
                    <label>
                        Set A Password<span className="req">*</span>
                    </label>
                    <input type="password" required autoComplete="off" />
                </div>

                <button type="submit" className="button button-block" >Get Started</button>

                </form>
            </div>    
        )
    }

    renderContent() {
        if (this.state.openedTab === 'signup') {
            return this.renderSignUp()
        } else {
            return this.renderLogin()
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
                            className={`tab ${this.state.openedTab === 'signup' ? "active" : ""}`}
                            onClick={() => this.updateTab('signup')}><a href="#signup">Sign Up</a></li>
                        <li
                            className={`tab ${this.state.openedTab === 'login' ? "active" : ""}`}
                            onClick={() => this.updateTab('login')}><a href="#login">Log In</a></li>
                    </ul>

                    <div className="">

                        {this.renderContent()}  
                        
                    </div>

                    <div id="login">
                        <h1>Welcome Back!</h1>
                    </div>
                        

                </div>
            </Fragment>    
        )
    }
}