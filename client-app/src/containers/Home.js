import React, { Component, Fragment } from 'react'
import API from '../services/instagram-api'
import { Redirect } from 'react-router-dom'
import { EPhoto } from '../components/EPhoto'
import { emojify as EMOTIONS_API } from '../services/microsoft-api'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: [],
            data: [],
            hasAuth: API.hasAuth(),
            emotions: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {
        this.setState({ isLoading: true })
        
        API.getPhotos()
            .then(
                data => this.setState({ data, error: [], isLoading: false}),
                error => this.setState({ data: [], error, isLoading: false}),
            )
    }

    handleClick(url) {
        EMOTIONS_API(url)
            .then(data => {
                this.setState({
                    emotions: {
                        ...this.state.emotions,
                        [url]: data
                    }
                }, () => {
                    console.log(this.state, url)
                })
            })
    }

    renderHome() {
        const { isLoading, error, data, emotions } = this.state
        
        if (isLoading) {
            return <p>'Loading...'</p>
        } 

        if (error.length > 0) {
            return <p> ERROR </p>
        } else {
            return (
                <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                    {
                        data.map(photo => {
                            return (<div
                                key={photo.id}
                                >
                                
                                <EPhoto
                                    url = {photo.url}
                                    emojify={this.handleClick}
                                    emotions = { emotions[photo.url]}
                                />
                            </div>)
                        })
                    }
                </div>
            )
        }
           
    }
    
    
    render() {
        return  this.renderHome() 
    }


}