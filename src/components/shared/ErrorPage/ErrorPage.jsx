import React from 'react'
import { PropTypes } from 'prop-types'
import './ErrorPage.css'
import Image from './images/ekb.jpg'
import { Link } from 'react-router-dom'

export default function ErrorPage (props) {
    return (
        <div className="flexbox-errorpage-row">
            <img className="image flexbox-item" src={Image}/>
            <div className="flexbox-errorpage-column">
                <div className="error-code flexbox-container">
                    {props.code}
                </div>
                <Link to={'/'}>
                    <div className="error-description flexbox-item">
                        {props.description}
                    </div>
                </Link>
            </div>
        </div>
    )
}

ErrorPage.propTypes = {
    code: PropTypes.number,
    description: PropTypes.string
}
