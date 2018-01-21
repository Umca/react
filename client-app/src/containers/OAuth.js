import React, { Component, Fragment } from 'react'
import API from '../services/instagram-api'
import { Redirect} from 'react-router-dom'

export default class OAuth extends Component {
    constructor() {
        super()
        this.state = {
            token: null
        }
    }

    componentDidMount() {
        const token = window.location.hash
            .split('=')
            .slice(-1)[0]
        API.setToken(token)
        this.setState({token})
    }

    render() {
        return !this.state.token ? 'redirecting...' : <Redirect to='/' />
    }


}